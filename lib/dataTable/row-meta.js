'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setMeta = undefined;

var _util = require('./util');

/**
 *设置row中某一列的属性
 */
var setMeta = function setMeta(fieldName, key, value) {
    var meta = (0, _util._getField)(fieldName).meta;
    if (!meta) meta = (0, _util._getField)(fieldName).meta = {};
    var oldValue = meta[key];
    if ((0, _util.eq)(oldValue, value)) return;
    meta[key] = value;
    //this.metaChange(- this.metaChange())
    if (this.metaChange[fieldName + '.' + key]) {
        this.metaChange[fieldName + '.' + key](-this.metaChange[fieldName + '.' + key]());
    }

    if (key == 'enable') this.parent.enableChange(-this.parent.enableChange());
    if (this.parent.getCurrentRow() == this) {
        if (this.parent.metaChange[fieldName + '.' + key]) this.parent.metaChange[fieldName + '.' + key](-this.parent.metaChange[fieldName + '.' + key]());
        this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_CURRENT_META_CHANGE, {
            eventType: 'dataTableEvent',
            dataTable: this.parent.id,
            oldValue: oldValue,
            newValue: value
        });
        //this.parent.metaChange(- this.parent.metaChange())
    }
    this.parent.trigger(DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });

    this.parent.trigger(fieldName + '.' + key + '.' + DataTable.ON_ROW_META_CHANGE, {
        eventType: 'dataTableEvent',
        dataTable: this.parent.id,
        field: fieldName,
        meta: key,
        oldValue: oldValue,
        newValue: value,
        row: this
    });
}; /**
    * Module : kero dataTable row meta
    * Author : liuyk(liuyk@yonyou.com)
    * Date   : 2016-08-08 13:54:01
    */
exports.setMeta = setMeta;