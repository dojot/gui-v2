import React, { useState, useEffect } from 'react';
import Check from '@material-ui/icons/CheckCircleRounded';
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/ErrorRounded';
import Warning from '@material-ui/icons/WarningRounded';
import clsx from 'clsx';
import { Slide, IconButton } from '@material-ui/core';
import { TransitionGroup } from 'react-transition-group';
import { useStyles } from './style';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { EVENT } from 'sharedComponents/Constants';

const Toast = ({ type, children, onClose, index, autoClose }) => {
  const classes = useStyles();
  const getIcon = () => {
    if (type === 'info') return <Error />;
    if (type === 'success') return <Check />;
    if (type === 'warning') return <Error />;
    if (type === 'error') return <Warning />;
    return <Error />;
  };

  useEffect(() => {
    let timer = setTimeout(() => onClose(index), autoClose);
    return () => {
      clearTimeout(timer);
    };
  }, [index, onClose]);

  return (
    <div
      className={clsx(classes.root, {
        [classes.info]: type === 'info',
        [classes.success]: type === 'success',
        [classes.warning]: type === 'warning',
        [classes.error]: type === 'error',
      })}
    >
      <div className={classes.icon}>{getIcon()}</div>
      <div className={classes.text}>{children}</div>
      <div className={classes.action}>
        <IconButton
          size='small'
          color={'inherit'}
          aria-label='close'
          onClick={() => onClose(index)}
        >
          <Close fontSize='inherit' />
        </IconButton>
      </div>
    </div>
  );
};

const GlobalToast = () => {
  const { t } = useTranslation(['success', 'error']);
  const [toastStack, setToastStack] = useState([]);

  const getI18nMessage = (message, type) => {
    if (!message) {
      return null;
    }
    return t(`${type}:messages.${message}`);
  };

  const handleToast = ({ detail }) => {
    const newToast = {
      uuid: uuidv4(),
      toastMessage: getI18nMessage(detail.i18nMessage, detail.type),
      autoHideDuration: detail.duration > 0 ? detail.duration : null,
      toastType: detail.type,
    };
    setToastStack(oldArray => [...oldArray, newToast]);
  };

  useEffect(() => {
    window.addEventListener(EVENT.GLOBAL_TOAST, handleToast);
    return () => window.removeEventListener(EVENT.GLOBAL_TOAST, handleToast, false);
  }, [handleToast]);

  const removeItemFromArray = index => {
    const newArr = [];
    toastStack.map((item, idx) => {
      if (index !== idx) {
        newArr.push(item);
      }
    });
    setToastStack(newArr);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 30,
        top: 10,
        zIndex: 9999,
      }}
    >
      <TransitionGroup>
        {toastStack.map((toast, index) => {
          return (
            <Slide direction={'left'} key={toast.uuid}>
              <div>
                <Toast
                  type={toast.toastType}
                  onClose={() => removeItemFromArray(index)}
                  index={index}
                  autoClose={toast.autoHideDuration}
                >
                  {toast.toastMessage}
                </Toast>
              </div>
            </Slide>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default GlobalToast;
