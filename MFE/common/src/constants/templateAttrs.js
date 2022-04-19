export const TEMPLATE_ATTR_TYPES = Object.freeze({
  DYNAMIC: {
    value: 'dynamic',
    translation: 'attrs:attrType.dynamic',
  },
  STATIC: {
    value: 'static',
    translation: 'attrs:attrType.static',
  },
  ACTUATOR: {
    value: 'actuator',
    translation: 'attrs:attrType.actuator',
  },
});

export const TEMPLATE_ATTR_VALUE_TYPES = Object.freeze({
  BOOL: {
    value: 'bool',
    translation: 'attrs:attrValueType.bool',
  },
  GEO_POINT: {
    value: 'geo:point',
    translation: 'attrs:attrValueType.geo_point',
  },
  FLOAT: {
    value: 'float',
    translation: 'attrs:attrValueType.float',
  },
  INTEGER: {
    value: 'integer',
    translation: 'attrs:attrValueType.integer',
  },
  STRING: {
    value: 'string',
    translation: 'attrs:attrValueType.string',
  },
  OBJECT: {
    value: 'object',
    translation: 'attrs:attrValueType.object',
  },
  JSON: {
    value: 'json',
    translation: 'attrs:attrValueType.json',
  },
});
