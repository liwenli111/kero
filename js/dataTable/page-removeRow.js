/**
 * Module : kero dataTable page removeRow
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */

import {isNumber} from 'tinper-sparrow/js/util';
const removeRowByRowId = function (rowid) {
    for (var i = 0, count = this.rows.length; i < count; i++) {
        if (this.rows[i].rowId == rowid){
            this.rows.splice(i, 1);
            count--;
            this.updateSelectedIndices(i, '-')
            this.updateFocusIndex(i, '-')
        }
    }
}

/**
 * [updateSelectedIndices 更新选中行]
 * @param  {[type]} index [起始行号]
 * @param  {[type]} type  [增减类型]
 * @param  {[type]} num   [影响行数]
 */
const updateSelectedIndices = function (index, type, num) {
    if (!isNumber(num)) {
        num = 1
    }
    var selectedIndices = this.selectedIndices.slice();
    if (selectedIndices == null || selectedIndices.length == 0)
        return
    for (var i = 0, count = selectedIndices.length; i < count; i++) {
        if (type == '+') {
            if (selectedIndices[i] >= index)
                selectedIndices[i] = parseInt(selectedIndices[i]) + num
        }
        else if (type == '-') {
            if (selectedIndices[i] >= index && selectedIndices[i] <= index + num - 1) {
                selectedIndices.splice(i, 1)
            }
            else if (selectedIndices[i] > index + num - 1)
                selectedIndices[i] = selectedIndices[i] - num
        }
    }
    this.selectedIndices = selectedIndices
}

/**
 * [updateFocusIndex 更新focus行]
 * @param  {[type]} opIndex [起始行号]
 * @param  {[type]} opType  [增减类型]
 * @param  {[type]} num     [影响行数]
 */
const updateFocusIndex = function (opIndex, opType, num) {
    if (!isNumber(num)) {
        num = 1
    }
    if (opIndex <= this.focus && this.focus != -1) {
        if (opType === '+') {
            this.focus = this.focus + num
        } else if (opType === '-') {
            if (this.focus >= opIndex && this.focus <= opIndex + num - 1) {
                this.focus = this.focus - 1
            } else if (this.focus > opIndex + num - 1) {
                this.focus = this.focus - num
            }
        }
    }
}


export {
	removeRowByRowId,
	updateSelectedIndices,
	updateFocusIndex
}