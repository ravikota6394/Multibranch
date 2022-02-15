function attrMaxLength(obj, name) {
    if (obj.value !== "") {
        var oNameLength = $(name).attr('data-val-length-max');
        if (obj.value.length > oNameLength) {
            obj.value = obj.value.substring(0, oNameLength);
        }
        obj.value = obj.value;
    }
};
function attrConvertToUpper(obj, name) {
    if (obj.value !== "") {
        var oNameLength = $(name).attr('data-val-length-max');
        if (obj.value.length > oNameLength) {
            obj.value = obj.value.substring(0, oNameLength);
        }
        obj.value = obj.value.toUpperCase();
    }
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
function capitalizeAll(string) {
    return string.toUpperCase();
};
function uniqueGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}