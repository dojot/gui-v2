import { useCallback, useMemo, useState } from 'react';

export const useTemplateCreationState = () => {
  const [templateName, setTemplateName] = useState('');
  const [attrs, setAttrs] = useState([]);

  const canSaveTemplate = useMemo(() => {
    const haveAllRequiredData = attrs.every(attr => {
      const { name, type, valueType } = attr;
      return !!name.trim() && !!type && !!valueType;
    });

    return !!templateName.trim() && haveAllRequiredData;
  }, [attrs, templateName]);

  const handleCreateAttr = useCallback(() => {
    const id = Date.now();
    setAttrs(currentAttrs => [
      ...currentAttrs,
      { id, name: '', type: '', valueType: '', value: '' },
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
    setTemplateName('');
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
    templateName,
    setTemplateName,
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
