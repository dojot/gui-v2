import { useCallback, useMemo, useState } from 'react';

export const useTemplateCreationState = () => {
  const [templateLabel, setTemplateLabel] = useState('');
  const [attrs, setAttrs] = useState([]);

  const canSaveTemplate = useMemo(() => {
    const haveAllRequiredData = attrs.every(attr => {
      const { label, type, valueType } = attr;
      return !!label.trim() && !!type && !!valueType;
    });

    return !!templateLabel.trim() && haveAllRequiredData;
  }, [attrs, templateLabel]);

  const handleCreateAttr = useCallback(() => {
    const id = Date.now();
    setAttrs(currentAttrs => [
      ...currentAttrs,
      { id, label: '', type: '', valueType: '', staticValue: '' },
    ]);
  }, []);

  const handleDeleteAttr = useCallback(index => {
    setAttrs(currentAttrs => {
      const attrsClone = [...currentAttrs];
      attrsClone.splice(index, 1);
      return attrsClone;
    });
  }, []);

  const handleUpdateAttr = useCallback((index, attrKey, attrValue) => {
    setAttrs(currentAttrs => {
      const attrsClone = [...currentAttrs];
      attrsClone[index][attrKey] = attrValue;
      return attrsClone;
    });
  }, []);

  const handleClearState = useCallback(() => {
    setTemplateLabel('');
    setAttrs([]);
  }, []);

  const getAttrsWithoutId = useCallback(() => {
    const attrsWithoutId = attrs.map(attr => {
      const attrClone = { ...attr };
      delete attrClone.id;
      return attrClone;
    });

    return attrsWithoutId;
  }, [attrs]);

  return {
    templateLabel,
    setTemplateLabel,
    attrs,
    setAttrs,
    canSaveTemplate,
    handleCreateAttr,
    handleDeleteAttr,
    handleUpdateAttr,
    handleClearState,
    getAttrsWithoutId,
  };
};
