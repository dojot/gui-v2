import React, { useEffect, useState, useCallback } from 'react';

import ace from 'ace-builds';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ViewContainer } from 'sharedComponents/Containers';

import nodesHTML from '../../../mock/nodes.html';
import nodesJSON from '../../../mock/nodes.json';
import './style/app.scss';
import { Devices as Services } from '../../adapters/services/index';
import { actions as flowsActions } from '../../redux/modules/flows';
import { selectedFlowSelector } from '../../redux/selectors/flowsSelector';
import LabelBar from './layout/LabelBar';
import RED from './layout/red';

const Editor = () => {
  const { t } = useTranslation('flows');
  const dispatch = useDispatch();
  const flowObj = useSelector(selectedFlowSelector);
  const history = useHistory();

  const [flowDom, setFlowDom] = useState(undefined);
  const [flowName, setFlowName] = useState('');
  const [ready, setReady] = useState(false);

  const { flowid } = useParams();

  const cleanFlow = () => {
    dispatch(flowsActions.setFlow({ clear: true }));
    RED.workspaces.remove(null);
    RED.nodes.clear();
    window.RED = null;
    window.Services = null;
    setFlowDom(null);
  };

  useEffect(() => {
    if (!!flowid && flowObj.id === undefined) {
      dispatch(flowsActions.getFlowByID({ flowid }));
    }
  }, [flowid, flowObj]);

  useEffect(() => {
    if (!ready) return;
    if (flowObj.flow !== undefined) {
      RED.nodes.version(null);
      RED.nodes.import(flowObj.flow);
      RED.nodes.dirty(false);
      RED.view.redraw(true);
      RED.workspaces.show(RED.__currentFlow);
      setFlowName(flowObj.name);
    } else {
      RED.nodes.version(null);
      RED.nodes.import([]);
      RED.nodes.dirty(false);
      RED.view.redraw(true);
      RED.workspaces.show(RED.__currentFlow);
    }
  }, [flowObj, ready]);

  useEffect(() => {
    if (flowDom === undefined) return;
    window.RED = RED;
    window.ace = ace;
    window.Services = Services;
    const initDOM = () => {
      $(flowDom).append(nodesHTML);
      setReady(true);
    };

    const initNodes = () => {
      RED.nodes.setNodeList(nodesJSON);
      let count = 0;
      nodesJSON.forEach(n => {
        if (n.module !== 'node-red') {
          count += 1;
          RED.i18n.loadCatalog(n.id, () => {
            count -= 1;
            if (count === 0) {
              // tells i18next to update the page's localization placeholders
              $('.flows-wrapper').i18n();
              initDOM();
            }
          });
        }
      });
      if (count === 0) {
        $('.flows-wrapper').i18n();
      }
    };

    RED.i18n.init(() => {
      RED.palette.init();
      RED.workspaces.init();
      RED.view.init();
      RED.keyboard.init();
      RED.editor.init();
      RED.typeSearch.init();
      initNodes();
    });
    return () => {
      cleanFlow();
    };
  }, [flowDom]);

  const handleReturn = useCallback(() => {
    history.push(`/flows`);
  }, [history]);

  const handleSave = useCallback(() => {
    const saveObj = {
      name: flowName,
      enabled: true,
      flow: RED.nodes.createCompleteNodeSet(),
    };
    if (flowObj.id !== undefined) {
      dispatch(
        flowsActions.editFlow({
          flowID: flowObj.id,
          flowObj: JSON.stringify(saveObj),
          successCallback: handleReturn,
        }),
      );
    } else {
      dispatch(
        flowsActions.createFlow({ flow: JSON.stringify(saveObj), successCallback: handleReturn }),
      );
    }
  }, [RED, flowsActions, flowObj, flowName]);

  return (
    <ViewContainer headerTitle={t('flows:title')}>
      <LabelBar
        label={flowName}
        handleSaveClick={handleSave}
        handleName={setFlowName}
        handleCancel={handleReturn}
      />
      <div className='flows-wrapper'>
        <div id='main-container'>
          <div id='workspace'>
            <div id='chart' tabIndex='1' />
            <div id='workspace-toolbar' />
            <div id='editor-shade' className='hide' />
          </div>
          <div id='editor-stack' />

          <div id='palette'>
            <img src='/flows/red/images/spin.svg' className='palette-spinner hide' />
            <div id='palette-container' className='palette-scroll' />
            <div id='palette-footer'>
              <a className='palette-button' id='palette-collapse-all' href='#'>
                <i className='fa fa-angle-double-up' />
              </a>
              <a className='palette-button' id='palette-expand-all' href='#'>
                <i className='fa fa-angle-double-down' />
              </a>
            </div>
            <div id='palette-shade' className='hide' />
          </div>
        </div>

        <div id='flows-node-scripts' ref={elem => setFlowDom(elem)} />
      </div>
    </ViewContainer>
  );
};

export default Editor;
