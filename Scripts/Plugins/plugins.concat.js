/*! DataTables 1.10.2
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */
(function(za,O,l){var N=function(h){function T(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),d[c]=e,"o"===b[1]&&T(a[e])});a._hungarianMap=d}function G(a,b,c){a._hungarianMap||T(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==l&&(c||b[d]===l))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),G(a[d],b[d],c)):b[d]=b[e]})}function N(a){var b=p.defaults.oLanguage,c=a.sZeroRecords;
!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&D(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&D(a,a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&cb(a)}function db(a){w(a,"ordering","bSort");w(a,"orderMulti","bSortMulti");w(a,"orderClasses","bSortClasses");w(a,"orderCellsTop","bSortCellsTop");w(a,"order","aaSorting");w(a,"orderFixed","aaSortingFixed");w(a,"paging","bPaginate");
w(a,"pagingType","sPaginationType");w(a,"pageLength","iDisplayLength");w(a,"searching","bFilter");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&G(p.models.oSearch,a[b])}function eb(a){w(a,"orderable","bSortable");w(a,"orderData","aDataSort");w(a,"orderSequence","asSorting");w(a,"orderDataType","sortDataType")}function fb(a){var a=a.oBrowser,b=h("<div/>").css({position:"absolute",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,
overflow:"scroll"}).append(h('<div class="test"/>').css({width:"100%",height:10}))).appendTo("body"),c=b.find(".test");a.bScrollOversize=100===c[0].offsetWidth;a.bScrollbarLeft=1!==c.offset().left;b.remove()}function gb(a,b,c,d,e,f){var g,j=!1;c!==l&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Aa(a,b){var c=p.defaults.column,d=a.aoColumns.length,c=h.extend({},p.models.oColumn,c,{nTh:b?b:O.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:
"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},p.models.oSearch,c[d]);fa(a,d,null)}function fa(a,b,c){var b=a.aoColumns[b],d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==l&&null!==c&&(eb(c),G(p.defaults.column,c),c.mDataProp!==l&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&
!c.sClass&&(c.sClass=c.className),h.extend(b,c),D(b,c,"sWidth","sWidthOrig"),"number"===typeof c.iDataSort&&(b.aDataSort=[c.iDataSort]),D(b,c,"aDataSort"));var g=b.mData,j=U(g),i=b.mRender?U(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b.fnGetData=function(a,b,c){var d=j(a,b,l,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return Ba(g)(a,b,c)};a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));
a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function V(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Ca(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=
a.oScroll;(""!==b.sY||""!==b.sX)&&W(a);u(a,null,"column-sizing",[a])}function ga(a,b){var c=X(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function Y(a,b){var c=X(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function Z(a){return X(a,"bVisible").length}function X(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Da(a){var b=a.aoColumns,c=a.aoData,d=p.ext.type.detect,e,f,g,j,i,h,m,o,k;e=0;for(f=b.length;e<f;e++)if(m=b[e],k=[],!m.sType&&m._sManualType)m.sType=
m._sManualType;else if(!m.sType){g=0;for(j=d.length;g<j;g++){i=0;for(h=c.length;i<h&&!(k[i]===l&&(k[i]=A(a,i,e,"type")),o=d[g](k[i],a),!o||"html"===o);i++);if(o){m.sType=o;break}}m.sType||(m.sType="string")}}function hb(a,b,c,d){var e,f,g,j,i,n,m=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){n=b[e];var o=n.targets!==l?n.targets:n.aTargets;h.isArray(o)||(o=[o]);f=0;for(g=o.length;f<g;f++)if("number"===typeof o[f]&&0<=o[f]){for(;m.length<=o[f];)Aa(a);d(o[f],n)}else if("number"===typeof o[f]&&0>o[f])d(m.length+
o[f],n);else if("string"===typeof o[f]){j=0;for(i=m.length;j<i;j++)("_all"==o[f]||h(m[j].nTh).hasClass(o[f]))&&d(j,n)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function I(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},p.models.oRow,{src:c?"dom":"data"});f._aData=b;a.aoData.push(f);for(var b=a.aoColumns,f=0,g=b.length;f<g;f++)c&&Ea(a,e,f,A(a,e,f)),b[f].sType=null;a.aiDisplayMaster.push(e);(c||!a.oFeatures.bDeferRender)&&Fa(a,e,c,d);return e}function ha(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,
e){c=ia(a,e);return I(a,c.data,e,c.cells)})}function A(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,c=f.fnGetData(g,d,{settings:a,row:b,col:c});if(c===l)return a.iDrawError!=e&&null===j&&(P(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b,4),a.iDrawError=e),j;if((c===g||null===c)&&null!==j)c=j;else if("function"===typeof c)return c.call(g);return null===c&&"display"==d?"":c}function Ea(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,
d,{settings:a,row:b,col:c})}function Ga(a){return h.map(a.match(/(\\.|[^\.])+/g),function(a){return a.replace(/\\./g,".")})}function U(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=U(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==l?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,
j;if(""!==f){j=Ga(f);for(var i=0,h=j.length;i<h;i++){f=j[i].match($);g=j[i].match(Q);if(f){j[i]=j[i].replace($,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");i=0;for(h=a.length;i<h;i++)g.push(c(a[i],b,j));a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(Q,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===l)return l;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}function Ba(a){if(h.isPlainObject(a))return Ba(a._);
if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ga(e),f;f=e[e.length-1];for(var g,j,i=0,h=e.length-1;i<h;i++){g=e[i].match($);j=e[i].match(Q);if(g){e[i]=e[i].replace($,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");j=0;for(h=d.length;j<h;j++)f={},b(f,d[j],g),a[e[i]].push(f);return}j&&(e[i]=e[i].replace(Q,""),a=a[e[i]](d));if(null===
a[e[i]]||a[e[i]]===l)a[e[i]]={};a=a[e[i]]}if(f.match(Q))a[f.replace(Q,"")](d);else a[f.replace($,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ha(a){return C(a.aoData,"_aData")}function ja(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0}function ka(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===l&&a.splice(d,1)}function la(a,b,c,d){var e=a.aoData[b],f;if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=
ia(a,e).data;else{var g=e.anCells,j;if(g){c=0;for(f=g.length;c<f;c++){for(j=g[c];j.childNodes.length;)j.removeChild(j.firstChild);g[c].innerHTML=A(a,b,c,"display")}}}e._aSortData=null;e._aFilterData=null;a=a.aoColumns;if(d!==l)a[d].sType=null;else{c=0;for(f=a.length;c<f;c++)a[c].sType=null}Ia(e)}function ia(a,b){var c=[],d=[],e=b.firstChild,f,g,j,i=0,n,m=a.aoColumns,o=function(a,b,c){"string"===typeof a&&(b=a.indexOf("@"),-1!==b&&(a=a.substring(b+1),j["@"+a]=c.getAttribute(a)))},k=function(a){g=m[i];
n=h.trim(a.innerHTML);g&&g._bAttrSrc?(j={display:n},o(g.mData.sort,j,a),o(g.mData.type,j,a),o(g.mData.filter,j,a),c.push(j)):c.push(n);i++};if(e)for(;e;){f=e.nodeName.toUpperCase();if("TD"==f||"TH"==f)k(e),d.push(e);e=e.nextSibling}else{d=b.anCells;e=0;for(f=d.length;e<f;e++)k(d[e])}return{data:c,cells:d}}function Fa(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,h,m,o;if(null===e.nTr){j=c||O.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;Ia(e);m=0;for(o=a.aoColumns.length;m<o;m++){h=a.aoColumns[m];
i=c?d[m]:O.createElement(h.sCellType);g.push(i);if(!c||h.mRender||h.mData!==m)i.innerHTML=A(a,b,m,"display");h.sClass&&(i.className+=" "+h.sClass);h.bVisible&&!c?j.appendChild(i):!h.bVisible&&c&&i.parentNode.removeChild(i);h.fnCreatedCell&&h.fnCreatedCell.call(a.oInstance,i,A(a,b,m),f,b,m)}u(a,"aoRowCreatedCallback",null,[j,f,b])}e.nTr.setAttribute("role","row")}function Ia(a){var b=a.nTr,c=a._aData;if(b){c.DT_RowId&&(b.id=c.DT_RowId);if(c.DT_RowClass){var d=c.DT_RowClass.split(" ");a.__rowc=a.__rowc?
Ja(a.__rowc.concat(d)):d;h(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)}c.DT_RowData&&h(b).data(c.DT_RowData)}}function ib(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,n=a.oClasses,m=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=m.length;b<c;b++)f=m[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ka(a,f.nTh,b))),f.sTitle!=d.html()&&
d.html(f.sTitle),La(a,"header")(a,d,f,n);i&&aa(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(n.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=m[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function ba(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,n;if(b){c===l&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&
!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(n=i=1,j[d][f]===l){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==l&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+n]!==l&&g[d][f].cell==g[d][f+n].cell;){for(c=0;c<i;c++)j[d+c][f+n]=1;n++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",n)}}}}function K(a){var b=u(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))B(a,!1);else{var b=
[],c=0,d=a.asStripeClasses,e=d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==z(a),i=a.aiDisplay;a.bDrawing=!0;g!==l&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,n=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,B(a,!1);else if(j){if(!a.bDestroying&&!jb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:n;for(j=j?0:g;j<f;j++){var m=i[j],o=a.aoData[m];null===o.nTr&&Fa(a,m);m=o.nTr;if(0!==e){var k=d[c%e];o._sRowStripe!=
k&&(h(m).removeClass(o._sRowStripe).addClass(k),o._sRowStripe=k)}u(a,"aoRowCallback",null,[m,o._aData,c,j]);b.push(m);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==z(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:Z(a),"class":a.oClasses.sRowEmpty}).html(c))[0];u(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ha(a),g,n,i]);u(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],
Ha(a),g,n,i]);d=h(a.nTBody);d.children().detach();d.append(h(b));u(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function L(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&kb(a);d?ca(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;K(a);a._drawHold=!1}function lb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});
a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,n,m,o,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];n=f[k+1];if("'"==n||'"'==n){m="";for(o=2;f[k+o]!=n;)m+=f[k+o],o++;"H"==m?m=b.sJUIHeader:"F"==m&&(m=b.sJUIFooter);-1!=m.indexOf(".")?(n=m.split("."),i.id=n[0].substr(1,n[0].length-1),i.className=n[1]):"#"==m.charAt(0)?i.id=m.substr(1,m.length-1):i.className=m;k+=o}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==
j&&d.bPaginate&&d.bLengthChange)g=mb(a);else if("f"==j&&d.bFilter)g=nb(a);else if("r"==j&&d.bProcessing)g=ob(a);else if("t"==j)g=pb(a);else if("i"==j&&d.bInfo)g=qb(a);else if("p"==j&&d.bPaginate)g=rb(a);else if(0!==p.ext.feature.length){i=p.ext.feature;o=0;for(n=i.length;o<n;o++)if(j==i[o].cFeature){g=i[o].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e)}function aa(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,n,m,o,k;a.splice(0,a.length);f=0;for(i=c.length;f<
i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){m=1*e.getAttribute("colspan");o=1*e.getAttribute("rowspan");m=!m||0===m||1===m?1:m;o=!o||0===o||1===o?1:o;g=0;for(j=a[f];j[g];)g++;n=g;k=1===m?!0:!1;for(j=0;j<m;j++)for(g=0;g<o;g++)a[f+g][n+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ma(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],aa(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<
g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function na(a,b,c){u(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance;if(h.isPlainObject(g)&&g.data){f=g.data;var i=h.isFunction(f)?f(b):f,b=h.isFunction(f)&&i?i:h.extend(!0,b,i);delete g.data}i={data:b,success:function(b){var d=b.error||b.sError;
d&&a.oApi._fnLog(a,0,d);a.json=b;u(a,null,"xhr",[a,b]);c(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=a.oApi._fnLog;"parsererror"==c?d(a,0,"Invalid JSON response",1):4===b.readyState&&d(a,0,"Ajax error",7);B(a,!1)}};a.oAjaxData=b;u(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),c,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(i,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,
b,c,a):(a.jqXHR=h.ajax(h.extend(i,g)),g.data=f)}function jb(a){return a.bAjaxDataGet?(a.iDraw++,B(a,!0),na(a,sb(a),function(b){tb(a,b)}),!1):!0}function sb(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,n,m,o=R(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var k=function(a,b){j.push({name:a,value:b})};k("sEcho",a.iDraw);k("iColumns",c);k("sColumns",C(b,"sName").join(","));k("iDisplayStart",g);k("iDisplayLength",i);var l={draw:a.iDraw,
columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)n=b[g],m=f[g],i="function"==typeof n.mData?"function":n.mData,l.columns.push({data:i,name:n.sName,searchable:n.bSearchable,orderable:n.bSortable,search:{value:m.sSearch,regex:m.bRegex}}),k("mDataProp_"+g,i),d.bFilter&&(k("sSearch_"+g,m.sSearch),k("bRegex_"+g,m.bRegex),k("bSearchable_"+g,n.bSearchable)),d.bSort&&k("bSortable_"+g,n.bSortable);d.bFilter&&(k("sSearch",e.sSearch),k("bRegex",e.bRegex));d.bSort&&
(h.each(o,function(a,b){l.order.push({column:b.col,dir:b.dir});k("iSortCol_"+a,b.col);k("sSortDir_"+a,b.dir)}),k("iSortingCols",o.length));b=p.ext.legacy.ajax;return null===b?a.sAjaxSource?j:l:b?j:l}function tb(a,b){var c=b.sEcho!==l?b.sEcho:b.draw,d=b.iTotalRecords!==l?b.iTotalRecords:b.recordsTotal,e=b.iTotalDisplayRecords!==l?b.iTotalDisplayRecords:b.recordsFiltered;if(c){if(1*c<a.iDraw)return;a.iDraw=1*c}ja(a);a._iRecordsTotal=parseInt(d,10);a._iRecordsDisplay=parseInt(e,10);c=oa(a,b);d=0;for(e=
c.length;d<e;d++)I(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;K(a);a._bInitComplete||pa(a,b);a.bAjaxDataGet=!0;B(a,!1)}function oa(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==l?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?U(c)(b):b}function nb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",
{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ca(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,K(a))},i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT","ssp"===z(a)?Ma(f,400):f).bind("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",
function(b,c){if(a===c)try{i[0]!==O.activeElement&&i.val(e.sSearch)}catch(d){}});return b[0]}function ca(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Da(a);if("ssp"!=z(a)){ub(a,b.sSearch,c,b.bEscapeRegex!==l?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)vb(a,e[b].sSearch,b,e[b].bEscapeRegex!==l?!e[b].bEscapeRegex:e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);
wb(a)}else f(b);a.bFiltered=!0;u(a,null,"search",[a])}function wb(a){for(var b=p.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,h=c.length;i<h;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;c.push.apply(c,j)}}function vb(a,b,c,d,e,f){if(""!==b)for(var g=a.aiDisplay,d=Na(b,d,e,f),e=g.length-1;0<=e;e--)b=a.aoData[g[e]]._aFilterData[c],d.test(b)||g.splice(e,1)}function ub(a,b,c,d,e,f){var d=Na(b,d,e,f),e=a.oPreviousSearch.sSearch,f=a.aiDisplayMaster,
g;0!==p.ext.search.length&&(c=!0);g=xb(a);if(0>=b.length)a.aiDisplay=f.slice();else{if(g||c||e.length>b.length||0!==b.indexOf(e)||a.bSorted)a.aiDisplay=f.slice();b=a.aiDisplay;for(c=b.length-1;0<=c;c--)d.test(a.aoData[b[c]]._sFilterRow)||b.splice(c,1)}}function Na(a,b,c,d){a=b?a:Oa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||"",function(a){return'"'===a.charAt(0)?a.match(/^"(.*)"$/)[1]:a}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function Oa(a){return a.replace(Vb,"\\$1")}function xb(a){var b=
a.aoColumns,c,d,e,f,g,j,i,h,m=p.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=A(a,d,e,"filter"),m[c.sType]&&(i=m[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(qa.innerHTML=i,i=Wb?qa.textContent:qa.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function yb(a){return{search:a.sSearch,
smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function zb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function qb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Ab,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return d[0]}function Ab(a){var b=a.aanFeatures.i;if(0!==b.length){var c=
a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Bb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Bb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,
c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ra(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;if(a.bInitialised){lb(a);ib(a);ba(a,a.aoHeader);ba(a,a.aoFooter);B(a,!0);c.bAutoWidth&&Ca(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=s(f.sWidth));L(a);e=z(a);"ssp"!=e&&("ajax"==e?na(a,[],function(c){var f=oa(a,c);for(b=0;b<f.length;b++)I(a,f[b]);a.iInitDisplayStart=d;L(a);B(a,!1);pa(a,c)},a):
(B(a,!1),pa(a)))}else setTimeout(function(){ra(a)},200)}function pa(a,b){a._bInitComplete=!0;b&&V(a);u(a,"aoInitComplete","init",[a,b])}function Pa(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Qa(a);u(a,null,"length",[a,c])}function mb(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option(d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);
a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).bind("change.DT",function(){Pa(a,h(this).val());K(a)});h(a.nTable).bind("length.dt.DT",function(b,c,d){a===c&&h("select",i).val(d)});return i[0]}function rb(a){var b=a.sPaginationType,c=p.ext.pager[b],d="function"===typeof c,e=function(a){K(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+
"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),m=-1===i,b=m?0:Math.ceil(b/i),i=m?1:Math.ceil(h/i),h=c(b,i),o,m=0;for(o=f.p.length;m<o;m++)La(a,"pageButton")(a,f.p[m],m,h,b,i)}else c.fnUpdate(a,e)},sName:"pagination"}));return b}function Ra(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==
b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:P(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(u(a,null,"page",[a]),c&&K(a));return b}function ob(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function B(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");u(a,null,"processing",[a,b])}function pb(a){var b=h(a.nTable);b.attr("role",
"grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),n=h(b[0].cloneNode(!1)),m=b.children("tfoot");c.sX&&"100%"===b.attr("width")&&b.removeAttr("width");m.length||(m=null);c=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:d?!d?null:s(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",
width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append(b.children("thead")))).append("top"===j?g:null)).append(h("<div/>",{"class":f.sScrollBody}).css({overflow:"auto",height:!e?null:s(e),width:!d?null:s(d)}).append(b));m&&c.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:s(d):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(n.removeAttr("id").css("margin-left",0).append(b.children("tfoot")))).append("bottom"===j?g:
null));var b=c.children(),o=b[0],f=b[1],k=m?b[2]:null;d&&h(f).scroll(function(){var a=this.scrollLeft;o.scrollLeft=a;m&&(k.scrollLeft=a)});a.nScrollHead=o;a.nScrollBody=f;a.nScrollFoot=k;a.aoDrawCallback.push({fn:W,sName:"scrolling"});return c[0]}function W(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,f=b.iBarWidth,g=h(a.nScrollHead),j=g[0].style,i=g.children("div"),n=i[0].style,m=i.children("table"),i=a.nScrollBody,o=h(i),k=i.style,l=h(a.nScrollFoot).children("div"),p=l.children("table"),r=h(a.nTHead),
q=h(a.nTable),da=q[0],M=da.style,J=a.nTFoot?h(a.nTFoot):null,u=a.oBrowser,v=u.bScrollOversize,y,t,x,w,z,A=[],B=[],C=[],D,E=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};q.children("thead, tfoot").remove();z=r.clone().prependTo(q);y=r.find("tr");x=z.find("tr");z.find("th, td").removeAttr("tabindex");J&&(w=J.clone().prependTo(q),t=J.find("tr"),w=w.find("tr"));c||(k.width="100%",g[0].style.width="100%");h.each(ma(a,z),function(b,c){D=
ga(a,b);c.style.width=a.aoColumns[D].sWidth});J&&F(function(a){a.style.width=""},w);b.bCollapse&&""!==e&&(k.height=o[0].offsetHeight+r[0].offsetHeight+"px");g=q.outerWidth();if(""===c){if(M.width="100%",v&&(q.find("tbody").height()>i.offsetHeight||"scroll"==o.css("overflow-y")))M.width=s(q.outerWidth()-f)}else""!==d?M.width=s(d):g==o.width()&&o.height()<q.height()?(M.width=s(g-f),q.outerWidth()>g-f&&(M.width=s(g))):M.width=s(g);g=q.outerWidth();F(E,x);F(function(a){C.push(a.innerHTML);A.push(s(h(a).css("width")))},
x);F(function(a,b){a.style.width=A[b]},y);h(x).height(0);J&&(F(E,w),F(function(a){B.push(s(h(a).css("width")))},w),F(function(a,b){a.style.width=B[b]},t),h(w).height(0));F(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+C[b]+"</div>";a.style.width=A[b]},x);J&&F(function(a,b){a.innerHTML="";a.style.width=B[b]},w);if(q.outerWidth()<g){t=i.scrollHeight>i.offsetHeight||"scroll"==o.css("overflow-y")?g+f:g;if(v&&(i.scrollHeight>i.offsetHeight||"scroll"==o.css("overflow-y")))M.width=
s(t-f);(""===c||""!==d)&&P(a,1,"Possible column misalignment",6)}else t="100%";k.width=s(t);j.width=s(t);J&&(a.nScrollFoot.style.width=s(t));!e&&v&&(k.height=s(da.offsetHeight+f));e&&b.bCollapse&&(k.height=s(e),b=c&&da.offsetWidth>i.offsetWidth?f:0,da.offsetHeight<i.offsetHeight&&(k.height=s(da.offsetHeight+b)));b=q.outerWidth();m[0].style.width=s(b);n.width=s(b);m=q.height()>i.clientHeight||"scroll"==o.css("overflow-y");u="padding"+(u.bScrollbarLeft?"Left":"Right");n[u]=m?f+"px":"0px";J&&(p[0].style.width=
s(b),l[0].style.width=s(b),l[0].style[u]=m?f+"px":"0px");o.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)i.scrollTop=0}function F(a,b,c){for(var d=0,e=0,f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Ca(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,d=X(a,"bVisible"),i=h("th",a.nTHead),n=b.getAttribute("width"),m=b.parentNode,o=!1,k,l;for(k=0;k<
d.length;k++)l=c[d[k]],null!==l.sWidth&&(l.sWidth=Cb(l.sWidthOrig,m),o=!0);if(!o&&!f&&!e&&j==Z(a)&&j==i.length)for(k=0;k<j;k++)c[k].sWidth=s(i.eq(k).width());else{j=h(b).clone().empty().css("visibility","hidden").removeAttr("id").append(h(a.nTHead).clone(!1)).append(h(a.nTFoot).clone(!1)).append(h("<tbody><tr/></tbody>"));j.find("tfoot th, tfoot td").css("width","");var p=j.find("tbody tr"),i=ma(a,j.find("thead")[0]);for(k=0;k<d.length;k++)l=c[d[k]],i[k].style.width=null!==l.sWidthOrig&&""!==l.sWidthOrig?
s(l.sWidthOrig):"";if(a.aoData.length)for(k=0;k<d.length;k++)o=d[k],l=c[o],h(Db(a,o)).clone(!1).append(l.sContentPadding).appendTo(p);j.appendTo(m);f&&g?j.width(g):f?(j.css("width","auto"),j.width()<m.offsetWidth&&j.width(m.offsetWidth)):e?j.width(m.offsetWidth):n&&j.width(n);Eb(a,j[0]);if(f){for(k=g=0;k<d.length;k++)l=c[d[k]],e=h(i[k]).outerWidth(),g+=null===l.sWidthOrig?e:parseInt(l.sWidth,10)+e-h(i[k]).width();j.width(s(g));b.style.width=s(g)}for(k=0;k<d.length;k++)if(l=c[d[k]],e=h(i[k]).width())l.sWidth=
s(e);b.style.width=s(j.css("width"));j.remove()}n&&(b.style.width=s(n));if((n||f)&&!a._reszEvt)h(za).bind("resize.DT-"+a.sInstance,Ma(function(){V(a)})),a._reszEvt=!0}function Ma(a,b){var c=b||200,d,e;return function(){var b=this,g=+new Date,j=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=l;a.apply(b,j)},c)):d?(d=g,a.apply(b,j)):d=g}}function Cb(a,b){if(!a)return 0;var c=h("<div/>").css("width",s(a)).appendTo(b||O.body),d=c[0].offsetWidth;c.remove();return d}function Eb(a,b){var c=
a.oScroll;if(c.sX||c.sY)c=!c.sX?c.iBarWidth:0,b.style.width=s(h(b).outerWidth()-c)}function Db(a,b){var c=Fb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(A(a,c,b,"display"))[0]:d.anCells[b]}function Fb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=A(a,f,b,"display")+"",c=c.replace(Xb,""),c.length>d&&(d=c.length,e=f);return e}function s(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function Gb(){if(!p.__scrollbarWidth){var a=
h("<p/>").css({width:"100%",height:200,padding:0})[0],b=h("<div/>").css({position:"absolute",top:0,left:0,width:200,height:150,padding:0,overflow:"hidden",visibility:"hidden"}).append(a).appendTo("body"),c=a.offsetWidth;b.css("overflow","scroll");a=a.offsetWidth;c===a&&(a=b[0].clientWidth);b.remove();p.__scrollbarWidth=c-a}return p.__scrollbarWidth}function R(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var n=[];f=function(a){a.length&&!h.isArray(a[0])?n.push(a):n.push.apply(n,
a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<n.length;a++){i=n[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",d.push({src:i,col:g,dir:n[a][1],index:n[a][2],type:j,formatter:p.ext.type.order[j+"-pre"]})}return d}function kb(a){var b,c,d=[],e=p.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Da(a);h=R(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Hb(a,j.col);if("ssp"!=z(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=
b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,l=f[a]._aSortData,p=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=l[j.col],e=p[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,l=h.length,p=f[a]._aSortData,r=f[b]._aSortData;for(j=0;j<l;j++)if(i=h[j],c=p[i.col],g=r[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Ib(a){for(var b,c,
d=a.aoColumns,e=R(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Sa(a,b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a){var b=a._idx;b===l&&(b=h.inArray(a[1],
f));return b+1>=f.length?0:b+1};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,C(e,"0")),-1!==c?(b=g(e[c]),e[c][1]=f[b],e[c]._idx=b):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);L(a);"function"==typeof d&&d(a)}function Ka(a,b,c,d){var e=a.aoColumns[c];Ta(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(B(a,!0),setTimeout(function(){Sa(a,c,b.shiftKey,
d);"ssp"!==z(a)&&B(a,!1)},0)):Sa(a,c,b.shiftKey,d))})}function sa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=R(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(C(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(C(a.aoData,"anCells",g)).addClass(c+(2>e?e+1:3))}a.aLastSort=d}function Hb(a,b){var c=a.aoColumns[b],d=p.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,Y(a,b)));for(var f,g=p.ext.type.order[c.sType+
"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:A(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function ta(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:yb(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:yb(a.aoPreSearchCols[d])}})};u(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=
b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Jb(a){var b,c,d=a.aoColumns;if(a.oFeatures.bStateSave){var e=a.fnStateLoadCallback.call(a.oInstance,a);if(e&&e.time&&(b=u(a,"aoStateLoadParams","stateLoadParams",[a,e]),-1===h.inArray(!1,b)&&(b=a.iStateDuration,!(0<b&&e.time<+new Date-1E3*b)&&d.length===e.columns.length))){a.oLoadedState=h.extend(!0,{},e);a._iDisplayStart=e.start;a.iInitDisplayStart=e.start;a._iDisplayLength=e.length;a.aaSorting=[];h.each(e.order,function(b,c){a.aaSorting.push(c[0]>=
d.length?[0,c[1]]:c)});h.extend(a.oPreviousSearch,zb(e.search));b=0;for(c=e.columns.length;b<c;b++){var f=e.columns[b];d[b].bVisible=f.visible;h.extend(a.aoPreSearchCols[b],zb(f.search))}u(a,"aoStateLoaded","stateLoaded",[a,e])}}}function ua(a){var b=p.settings,a=h.inArray(a,C(b,"nTable"));return-1!==a?b[a]:null}function P(a,b,c,d){c="DataTables warning: "+(null!==a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)za.console&&
console.log&&console.log(c);else if(a=p.ext,"alert"==(a.sErrMode||a.errMode))alert(c);else throw Error(c);}function D(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?D(a,b,d[0],d[1]):D(a,b,d)}):(d===l&&(d=c),b[c]!==l&&(a[d]=b[c]))}function Kb(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Ta(a,b,c){h(a).bind("click.DT",b,function(b){a.blur();
c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function x(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function u(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&h(a.nTable).trigger(c+".dt",d);return e}function Qa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;c===a.fnRecordsDisplay()&&(b=c-d);if(-1===d||0>b)b=0;a._iDisplayStart=b}function La(a,b){var c=
a.renderer,d=p.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===typeof c?d[c]||d._:d._}function z(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function Ua(a,b){var c=[],c=Lb.numbers_length,d=Math.floor(c/2);b<=c?c=S(0,b):a<=d?(c=S(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=S(b-(c-2),b):(c=S(a-1,a+2),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function cb(a){h.each({num:function(b){return va(b,
a)},"num-fmt":function(b){return va(b,a,Va)},"html-num":function(b){return va(b,a,wa)},"html-num-fmt":function(b){return va(b,a,wa,Va)}},function(b,c){t.type.order[b+a+"-pre"]=c})}function Mb(a){return function(){var b=[ua(this[p.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return p.ext.internal[a].apply(this,b)}}var p,t,q,r,v,Wa={},Nb=/[\r\n]/g,wa=/<.*?>/g,Yb=/^[\w\+\-]/,Zb=/[\w\+\-]$/,Vb=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Va=/[',$\u00a3\u20ac\u00a5%\u2009\u202F]/g,
H=function(a){return!a||!0===a||"-"===a?!0:!1},Ob=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},Pb=function(a,b){Wa[b]||(Wa[b]=RegExp(Oa(b),"g"));return"string"===typeof a?a.replace(/\./g,"").replace(Wa[b],"."):a},Xa=function(a,b,c){var d="string"===typeof a;b&&d&&(a=Pb(a,b));c&&d&&(a=a.replace(Va,""));return H(a)||!isNaN(parseFloat(a))&&isFinite(a)},Qb=function(a,b,c){return H(a)?!0:!(H(a)||"string"===typeof a)?null:Xa(a.replace(wa,""),b,c)?!0:null},C=function(a,b,c){var d=
[],e=0,f=a.length;if(c!==l)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<f;e++)a[e]&&d.push(a[e][b]);return d},xa=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==l)for(;f<g;f++)e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},S=function(a,b){var c=[],d;b===l?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Ja=function(a){var b=[],c,d,e=a.length,f,g=0;d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b},w=function(a,
b,c){a[b]!==l&&(a[c]=a[b])},$=/\[.*?\]$/,Q=/\(\)$/,qa=h("<div>")[0],Wb=qa.textContent!==l,Xb=/<.*?>/g;p=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new q(ua(this[t.iApiIndex])):new q(this)};this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===l||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=
function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===l||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&W(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===l||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===l||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(!a)};
this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===l?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==l){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==l||"td"==d||"th"==d?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==l?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();
return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===l||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===l||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return ua(this[t.iApiIndex])};
this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===l||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===l||e)&&h.columns.adjust();(d===l||d)&&h.draw();return 0};this.fnVersionCheck=t.fnVersionCheck;var b=this,c=a===l,d=this.length;c&&(a={});this.oApi=this.internal=t.internal;for(var e in p.ext.internal)e&&(this[e]=Mb(e));this.each(function(){var e={},g=1<d?Kb(e,a,!0):
a,j=0,i,n=this.getAttribute("id"),e=!1,m=p.defaults;if("table"!=this.nodeName.toLowerCase())P(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{db(m);eb(m.column);G(m,m,!0);G(m.column,m.column,!0);G(m,g);var o=p.settings,j=0;for(i=o.length;j<i;j++){if(o[j].nTable==this){i=g.bRetrieve!==l?g.bRetrieve:m.bRetrieve;if(c||i)return o[j].oInstance;if(g.bDestroy!==l?g.bDestroy:m.bDestroy){o[j].oInstance.fnDestroy();break}else{P(o[j],0,"Cannot reinitialise DataTable",3);return}}if(o[j].sTableId==
this.id){o.splice(j,1);break}}if(null===n||""===n)this.id=n="DataTables_Table_"+p.ext._unique++;var k=h.extend(!0,{},p.models.oSettings,{nTable:this,oApi:b.internal,oInit:g,sDestroyWidth:h(this)[0].style.width,sInstance:n,sTableId:n});o.push(k);k.oInstance=1===b.length?b:h(this).dataTable();db(g);g.oLanguage&&N(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Kb(h.extend(!0,{},m),g);D(k.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
D(k,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);D(k.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],
["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);D(k.oLanguage,g,"fnInfoCallback");x(k,"aoDrawCallback",g.fnDrawCallback,"user");x(k,"aoServerParams",g.fnServerParams,"user");x(k,"aoStateSaveParams",g.fnStateSaveParams,"user");x(k,"aoStateLoadParams",g.fnStateLoadParams,"user");x(k,"aoStateLoaded",g.fnStateLoaded,"user");x(k,"aoRowCallback",g.fnRowCallback,"user");x(k,"aoRowCreatedCallback",g.fnCreatedRow,"user");x(k,"aoHeaderCallback",g.fnHeaderCallback,"user");x(k,"aoFooterCallback",g.fnFooterCallback,
"user");x(k,"aoInitComplete",g.fnInitComplete,"user");x(k,"aoPreDrawCallback",g.fnPreDrawCallback,"user");n=k.oClasses;g.bJQueryUI?(h.extend(n,p.ext.oJUIClasses,g.oClasses),g.sDom===m.sDom&&"lfrtip"===m.sDom&&(k.sDom='<"H"lfr>t<"F"ip>'),k.renderer)?h.isPlainObject(k.renderer)&&!k.renderer.header&&(k.renderer.header="jqueryui"):k.renderer="jqueryui":h.extend(n,p.ext.classes,g.oClasses);h(this).addClass(n.sTable);if(""!==k.oScroll.sX||""!==k.oScroll.sY)k.oScroll.iBarWidth=Gb();!0===k.oScroll.sX&&(k.oScroll.sX=
"100%");k.iInitDisplayStart===l&&(k.iInitDisplayStart=g.iDisplayStart,k._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(k.bDeferLoading=!0,j=h.isArray(g.iDeferLoading),k._iRecordsDisplay=j?g.iDeferLoading[0]:g.iDeferLoading,k._iRecordsTotal=j?g.iDeferLoading[1]:g.iDeferLoading);""!==g.oLanguage.sUrl?(k.oLanguage.sUrl=g.oLanguage.sUrl,h.getJSON(k.oLanguage.sUrl,null,function(a){N(a);G(m.oLanguage,a);h.extend(true,k.oLanguage,g.oLanguage,a);ra(k)}),e=!0):h.extend(!0,k.oLanguage,g.oLanguage);
null===g.asStripeClasses&&(k.asStripeClasses=[n.sStripeOdd,n.sStripeEven]);var j=k.asStripeClasses,r=h("tbody tr:eq(0)",this);-1!==h.inArray(!0,h.map(j,function(a){return r.hasClass(a)}))&&(h("tbody tr",this).removeClass(j.join(" ")),k.asDestroyStripes=j.slice());var o=[],q,j=this.getElementsByTagName("thead");0!==j.length&&(aa(k.aoHeader,j[0]),o=ma(k));if(null===g.aoColumns){q=[];j=0;for(i=o.length;j<i;j++)q.push(null)}else q=g.aoColumns;j=0;for(i=q.length;j<i;j++)Aa(k,o?o[j]:null);hb(k,g.aoColumnDefs,
q,function(a,b){fa(k,a,b)});if(r.length){var s=function(a,b){return a.getAttribute("data-"+b)?b:null};h.each(ia(k,r[0]).cells,function(a,b){var c=k.aoColumns[a];if(c.mData===a){var d=s(b,"sort")||s(b,"order"),e=s(b,"filter")||s(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:l,type:d!==null?a+".@data-"+d:l,filter:e!==null?a+".@data-"+e:l};fa(k,a)}}})}var t=k.oFeatures;g.bStateSave&&(t.bStateSave=!0,Jb(k,g),x(k,"aoDrawCallback",ta,"state_save"));if(g.aaSorting===
l){o=k.aaSorting;j=0;for(i=o.length;j<i;j++)o[j][1]=k.aoColumns[j].asSorting[0]}sa(k);t.bSort&&x(k,"aoDrawCallback",function(){if(k.bSorted){var a=R(k),b={};h.each(a,function(a,c){b[c.src]=c.dir});u(k,null,"order",[k,a,b]);Ib(k)}});x(k,"aoDrawCallback",function(){(k.bSorted||z(k)==="ssp"||t.bDeferRender)&&sa(k)},"sc");fb(k);j=h(this).children("caption").each(function(){this._captionSide=h(this).css("caption-side")});i=h(this).children("thead");0===i.length&&(i=h("<thead/>").appendTo(this));k.nTHead=
i[0];i=h(this).children("tbody");0===i.length&&(i=h("<tbody/>").appendTo(this));k.nTBody=i[0];i=h(this).children("tfoot");if(0===i.length&&0<j.length&&(""!==k.oScroll.sX||""!==k.oScroll.sY))i=h("<tfoot/>").appendTo(this);0===i.length||0===i.children().length?h(this).addClass(n.sNoFooter):0<i.length&&(k.nTFoot=i[0],aa(k.aoFooter,k.nTFoot));if(g.aaData)for(j=0;j<g.aaData.length;j++)I(k,g.aaData[j]);else(k.bDeferLoading||"dom"==z(k))&&ha(k,h(k.nTBody).children("tr"));k.aiDisplay=k.aiDisplayMaster.slice();
k.bInitialised=!0;!1===e&&ra(k)}});b=null;return this};var Rb=[],y=Array.prototype,$b=function(a){var b,c,d=p.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};
q=function(a,b){if(!this instanceof q)throw"DT API must be constructed as a new object";var c=[],d=function(a){(a=$b(a))&&c.push.apply(c,a)};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=Ja(c);b&&this.push.apply(this,b.toArray?b.toArray():b);this.selector={rows:null,cols:null,opts:null};q.extend(this,this,Rb)};p.Api=q;q.prototype={concat:y.concat,context:[],each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new q(b[a],this[a]):null},filter:function(a){var b=[];if(y.filter)b=y.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new q(this.context,b)},flatten:function(){var a=[];return new q(this.context,a.concat.apply(a,this.toArray()))},join:y.join,indexOf:y.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c){var d=[],e,f,g,h,i,n=this.context,
m,o,k=this.selector;"string"===typeof a&&(c=b,b=a,a=!1);f=0;for(g=n.length;f<g;f++)if("table"===b)e=c(n[f],f),e!==l&&d.push(e);else if("columns"===b||"rows"===b)e=c(n[f],this[f],f),e!==l&&d.push(e);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){o=this[f];"column-rows"===b&&(m=Ya(n[f],k.opts));h=0;for(i=o.length;h<i;h++)e=o[h],e="cell"===b?c(n[f],e.row,e.column,f,h):c(n[f],e,f,h,m),e!==l&&d.push(e)}return d.length?(a=new q(n,a?d.concat.apply([],d):d),b=a.selector,b.rows=k.rows,b.cols=
k.cols,b.opts=k.opts,a):this},lastIndexOf:y.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(y.map)b=y.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new q(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:y.pop,push:y.push,reduce:y.reduce||function(a,b){return gb(this,a,b,0,this.length,1)},reduceRight:y.reduceRight||function(a,b){return gb(this,
a,b,this.length-1,-1,-1)},reverse:y.reverse,selector:null,shift:y.shift,sort:y.sort,splice:y.splice,toArray:function(){return y.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new q(this.context,Ja(this))},unshift:y.unshift};q.extend=function(a,b,c){if(b&&(b instanceof q||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=b.apply(a,arguments);q.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]=
"function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,q.extend(a,b[f.name],f.propExt)}};q.register=r=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)q.register(a[c],b);else for(var e=a.split("."),f=Rb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var n=f.length;i<n;i++)if(f[i].name===g){i=f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:
i.propExt}};q.registerPlural=v=function(a,b,c){q.register(a,c);q.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof q?a.length?h.isArray(a[0])?new q(a.context,a[0]):a[0]:l:a})};r("tables()",function(a){var b;if(a){b=q;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,d);return c[a]}).toArray();b=new b(a)}else b=this;return b});r("table()",function(a){var a=this.tables(a),
b=a.context;return b.length?new q(b[0]):a});v("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable})});v("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody})});v("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead})});v("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot})});v("tables().containers()",
"table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper})});r("draw()",function(a){return this.iterator("table",function(b){L(b,!1===a)})});r("page()",function(a){return a===l?this.page.info().page:this.iterator("table",function(b){Ra(b,a)})});r("page.info()",function(){if(0===this.context.length)return l;var a=this.context[0],b=a._iDisplayStart,c=a._iDisplayLength,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,
end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d}});r("page.len()",function(a){return a===l?0!==this.context.length?this.context[0]._iDisplayLength:l:this.iterator("table",function(b){Pa(b,a)})});var Sb=function(a,b,c){"ssp"==z(a)?L(a,b):(B(a,!0),na(a,[],function(c){ja(a);for(var c=oa(a,c),d=0,g=c.length;d<g;d++)I(a,c[d]);L(a,b);B(a,!1)}));if(c){var d=new q(a);d.one("draw",function(){c(d.ajax.json())})}};r("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});
r("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});r("ajax.reload()",function(a,b){return this.iterator("table",function(c){Sb(c,!1===b,a)})});r("ajax.url()",function(a){var b=this.context;if(a===l){if(0===b.length)return l;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});r("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Sb(c,
!1===b,a)})});var Za=function(a,b){var c=[],d,e,f,g,j,i;if(!a||"string"===typeof a||a.length===l)a=[a];f=0;for(g=a.length;f<g;f++){e=a[f]&&a[f].split?a[f].split(","):[a[f]];j=0;for(i=e.length;j<i;j++)(d=b("string"===typeof e[j]?h.trim(e[j]):e[j]))&&d.length&&c.push.apply(c,d)}return c},$a=function(a){a||(a={});a.filter&&!a.search&&(a.search=a.filter);return{search:a.search||"none",order:a.order||"current",page:a.page||"all"}},ab=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=
a[b],a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ya=function(a,b){var c,d,e,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;d=b.order;e=b.page;if("ssp"==z(a))return"removed"===j?[]:S(0,c.length);if("current"==e){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==d||"applied"==d)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===h.inArray(a,g)?a:null});else if("index"==d||"original"==d){c=0;for(d=a.aoData.length;c<d;c++)"none"==
j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};r("rows()",function(a,b){a===l?a="":h.isPlainObject(a)&&(b=a,a="");var b=$a(b),c=this.iterator("table",function(c){var e=b;return Za(a,function(a){var b=Ob(a);if(b!==null&&!e)return[b];var j=Ya(c,e);if(b!==null&&h.inArray(b,j)!==-1)return[b];if(!a)return j;for(var b=[],i=0,n=j.length;i<n;i++)b.push(c.aoData[j[i]].nTr);return a.nodeName&&h.inArray(a,b)!==-1?[a._DT_RowIndex]:h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()})});
c.selector.rows=a;c.selector.opts=b;return c});r("rows().nodes()",function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||l})});r("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return xa(a.aoData,b,"_aData")})});v("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData})});v("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,
c){la(b,c,a)})});v("rows().indexes()","row().index()",function(){return this.iterator("row",function(a,b){return b})});v("rows().remove()","row().remove()",function(){var a=this;return this.iterator("row",function(b,c,d){var e=b.aoData;e.splice(c,1);for(var f=0,g=e.length;f<g;f++)null!==e[f].nTr&&(e[f].nTr._DT_RowIndex=f);h.inArray(c,b.aiDisplay);ka(b.aiDisplayMaster,c);ka(b.aiDisplay,c);ka(a[d],c,!1);Qa(b)})});r("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;
for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(ha(b,c)[0]):h.push(I(b,c));return h}),c=this.rows(-1);c.pop();c.push.apply(c,b.toArray());return c});r("row()",function(a,b){return ab(this.rows(a,b))});r("row().data()",function(a){var b=this.context;if(a===l)return b.length&&this.length?b[0].aoData[this[0]]._aData:l;b[0].aoData[this[0]]._aData=a;la(b[0],this[0],"data");return this});r("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||
null:null});r("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?ha(b,a)[0]:I(b,a)});return this.row(b[0])});var bb=function(a){var b=a.context;b.length&&a.length&&(a=b[0].aoData[a[0]],a._details&&(a._details.remove(),a._detailsShow=l,a._details=l))},Tb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();
var e=c[0],f=new q(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<C(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=Z(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,
b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&bb(g[c])}))}}};r("row().child()",function(a,b){var c=this.context;if(a===l)return c.length&&this.length?c[0].aoData[this[0]]._details:l;if(!0===a)this.child.show();else if(!1===a)bb(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(a.nodeName&&"tr"===a.nodeName.toLowerCase())e.push(a);else{var c=h("<tr><td/></tr>").addClass(b);h("td",c).addClass(b).html(a)[0].colSpan=Z(d);e.push(c[0])}};if(h.isArray(a)||
a instanceof h)for(var g=0,j=a.length;g<j;g++)f(a[g],b);else f(a,b);c._details&&c._details.remove();c._details=h(e);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});r(["row().child.show()","row().child().show()"],function(){Tb(this,!0);return this});r(["row().child.hide()","row().child().hide()"],function(){Tb(this,!1);return this});r(["row().child.remove()","row().child().remove()"],function(){bb(this);return this});r("row().child.isShown()",function(){var a=this.context;return a.length&&
this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var ac=/^(.+):(name|visIdx|visible)$/;r("columns()",function(a,b){a===l?a="":h.isPlainObject(a)&&(b=a,a="");var b=$a(b),c=this.iterator("table",function(b){var c=a,f=b.aoColumns,g=C(f,"sName"),j=C(f,"nTh");return Za(c,function(a){var c=Ob(a);if(a==="")return S(f.length);if(c!==null)return[c>=0?c:f.length+c];var e=typeof a==="string"?a.match(ac):"";if(e)switch(e[2]){case "visIdx":case "visible":a=parseInt(e[1],10);if(a<0){c=h.map(f,function(a,
b){return a.bVisible?b:null});return[c[c.length+a]]}return[ga(b,a)];case "name":return h.map(g,function(a,b){return a===e[1]?b:null})}else return h(j).filter(a).map(function(){return h.inArray(this,j)}).toArray()})});c.selector.cols=a;c.selector.opts=b;return c});v("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh})});v("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf})});
v("columns().data()","column().data()",function(){return this.iterator("column-rows",function(a,b,c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(A(a,e[d],b,""));return c})});v("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return xa(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)})});v("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return xa(a.aoData,e,"anCells",b)})});v("columns().visible()",
"column().visible()",function(a,b){return this.iterator("column",function(c,d){var e;if(a===l)e=c.aoColumns[d].bVisible;else{var f=c.aoColumns;e=f[d];var g=c.aoData,j,i,n;if(a===l)e=e.bVisible;else{if(e.bVisible!==a){if(a){var m=h.inArray(!0,C(f,"bVisible"),d+1);j=0;for(i=g.length;j<i;j++)n=g[j].nTr,f=g[j].anCells,n&&n.insertBefore(f[d],f[m]||null)}else h(C(c.aoData,"anCells",d)).detach();e.bVisible=a;ba(c,c.aoHeader);ba(c,c.aoFooter);if(b===l||b)V(c),(c.oScroll.sX||c.oScroll.sY)&&W(c);u(c,null,"column-visibility",
[c,d,a]);ta(c)}e=void 0}}return e})});v("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?Y(b,c):c})});r("columns.adjust()",function(){return this.iterator("table",function(a){V(a)})});r("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return ga(c,b);if("fromData"===a||"toVisible"===a)return Y(c,b)}});r("column()",function(a,b){return ab(this.columns(a,b))});r("cells()",
function(a,b,c){h.isPlainObject(a)&&(typeof a.row!==l?(c=b,b=null):(c=a,a=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===l)return this.iterator("table",function(b){var d=a,e=$a(c),f=b.aoData,g=Ya(b,e),e=xa(f,g,"anCells"),j=h([].concat.apply([],e)),i,m=b.aoColumns.length,n,p,r,q;return Za(d,function(a){if(a===null||a===l){n=[];p=0;for(r=g.length;p<r;p++){i=g[p];for(q=0;q<m;q++)n.push({row:i,column:q})}return n}return h.isPlainObject(a)?[a]:j.filter(a).map(function(a,b){i=b.parentNode._DT_RowIndex;
return{row:i,column:h.inArray(b,f[i].anCells)}}).toArray()})});var d=this.columns(b,c),e=this.rows(a,c),f,g,j,i,n,m=this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(n=d[b].length;i<n;i++)f.push({row:e[b][g],column:d[b][i]})}return f});h.extend(m.selector,{cols:b,rows:a,opts:c});return m});v("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return a.aoData[b].anCells[c]})});r("cells().data()",function(){return this.iterator("cell",
function(a,b,c){return A(a,b,c)})});v("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]})});v("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:Y(a,c)}})});r(["cells().invalidate()","cell().invalidate()"],function(a){var b=this.selector;this.rows(b.rows,b.opts).invalidate(a);return this});r("cell()",function(a,b,
c){return ab(this.cells(a,b,c))});r("cell().data()",function(a){var b=this.context,c=this[0];if(a===l)return b.length&&c.length?A(b[0],c[0].row,c[0].column):l;Ea(b[0],c[0].row,c[0].column,a);la(b[0],c[0].row,"data",c[0].column);return this});r("order()",function(a,b){var c=this.context;if(a===l)return 0!==c.length?c[0].aaSorting:l;"number"===typeof a?a=[[a,b]]:h.isArray(a[0])||(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});r("order.listener()",
function(a,b,c){return this.iterator("table",function(d){Ka(d,a,b,c)})});r(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});r("search()",function(a,b,c,d){var e=this.context;return a===l?0!==e.length?e[0].oPreviousSearch.sSearch:l:this.iterator("table",function(e){e.oFeatures.bFilter&&ca(e,h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:
c,bCaseInsensitive:null===d?!0:d}),1)})});v("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===l)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),ca(e,e.oPreviousSearch,1))})});r("state()",function(){return this.context.length?this.context[0].oSavedState:null});r("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,
a,{})})});r("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});r("state.save()",function(){return this.iterator("table",function(a){ta(a)})});p.versionCheck=p.fnVersionCheck=function(a){for(var b=p.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};p.isDataTable=p.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;h.each(p.settings,function(a,e){if(e.nTable===b||e.nScrollHead===
b||e.nScrollFoot===b)c=!0});return c};p.tables=p.fnTables=function(a){return jQuery.map(p.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable})};p.camelToHungarian=G;r("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){r(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||(a[0]+=".dt");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});
r("clear()",function(){return this.iterator("table",function(a){ja(a)})});r("settings()",function(){return new q(this.context,this.context)});r("data()",function(){return this.iterator("table",function(a){return C(a.aoData,"_aData")}).flatten()});r("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),l=h(b.nTableWrapper),m=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=
!0;u(b,"aoDestroyCallback","destroy",[b]);a||(new q(b)).columns().visible(!0);l.unbind(".DT").find(":not(tbody *)").unbind(".DT");h(za).unbind(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));i.detach();l.detach();b.aaSorting=[];b.aaSortingFixed=[];sa(b);h(m).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);b.bJUI&&
(h("th span."+d.sSortIcon+", td span."+d.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+d.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));!a&&c&&c.insertBefore(e,b.nTableReinsertBefore);f.children().detach();f.append(m);i.css("width",b.sDestroyWidth).removeClass(d.sTable);(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])});c=h.inArray(b,p.settings);-1!==c&&p.settings.splice(c,1)})});p.version="1.10.2";p.settings=
[];p.models={};p.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};p.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null};p.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",
sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};p.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,
fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,
fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},
sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},p.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",sPaginationType:"simple_numbers",
sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null};T(p.defaults);p.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};T(p.defaults.column);p.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,
bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],
aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:l,oAjaxData:l,
fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==z(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==z(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=
this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{}};p.ext=t={classes:{},errMode:"alert",feature:[],search:[],internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:p.fnVersionCheck,
iApiIndex:0,oJUIClasses:{},sVersion:p.version};h.extend(t,{afnFiltering:t.search,aTypes:t.type.detect,ofnSearch:t.type.search,oSort:t.type.order,afnSortData:t.order,aoFeatures:t.feature,oApi:t.internal,oStdClasses:t.classes,oPagination:t.pager});h.extend(p.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",
sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",
sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var ya="",ya="",E=ya+"ui-state-default",ea=ya+"css_right ui-icon ui-icon-",Ub=ya+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(p.ext.oJUIClasses,p.ext.classes,{sPageButton:"fg-button ui-button "+E,sPageButtonActive:"ui-state-disabled",
sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:E+" sorting_asc",sSortDesc:E+" sorting_desc",sSortable:E+" sorting",sSortableAsc:E+" sorting_asc_disabled",sSortableDesc:E+" sorting_desc_disabled",sSortableNone:E+" sorting_disabled",sSortJUIAsc:ea+"triangle-1-n",sSortJUIDesc:ea+"triangle-1-s",sSortJUI:ea+"carat-2-n-s",sSortJUIAscAllowed:ea+"carat-1-n",sSortJUIDescAllowed:ea+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",
sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+E,sScrollFoot:"dataTables_scrollFoot "+E,sHeaderTH:E,sFooterTH:E,sJUIHeader:Ub+" ui-corner-tl ui-corner-tr",sJUIFooter:Ub+" ui-corner-bl ui-corner-br"});var Lb=p.ext.pager;h.extend(Lb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},simple_numbers:function(a,b){return["previous",Ua(a,b),"next"]},full_numbers:function(a,b){return["first","previous",Ua(a,b),"next","last"]},_numbers:Ua,
numbers_length:7});h.extend(!0,p.ext.renderer,{pageButton:{_:function(a,b,c,d,e,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i,l,m=0,o=function(b,d){var k,p,r,q,s=function(b){Ra(a,b.data.action,true)};k=0;for(p=d.length;k<p;k++){q=d[k];if(h.isArray(q)){r=h("<"+(q.DT_el||"div")+"/>").appendTo(b);o(r,q)}else{l=i="";switch(q){case "ellipsis":b.append("<span>&hellip;</span>");break;case "first":i=j.sFirst;l=q+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":i=j.sPrevious;l=q+(e>0?"":" "+g.sPageButtonDisabled);
break;case "next":i=j.sNext;l=q+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":i=j.sLast;l=q+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:i=q+1;l=e===q?g.sPageButtonActive:""}if(i){r=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"data-dt-idx":m,tabindex:a.iTabIndex,id:c===0&&typeof q==="string"?a.sTableId+"_"+q:null}).html(i).appendTo(b);Ta(r,{action:q},s);m++}}}};try{var k=h(O.activeElement).data("dt-idx");o(h(b).empty(),d);k!==null&&h(b).find("[data-dt-idx="+k+"]").focus()}catch(p){}}}});
var va=function(a,b,c,d){if(!a||"-"===a)return-Infinity;b&&(a=Pb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(t.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return H(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return H(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>
b?-1:0}});cb("");h.extend(p.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return Xa(a,c)?"num"+c:null},function(a){if(a&&(!Yb.test(a)||!Zb.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||H(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return Xa(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Qb(a,c,!0)?"html-num-fmt"+c:null},function(a){return H(a)||"string"===
typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(p.ext.type.search,{html:function(a){return H(a)?a:"string"===typeof a?a.replace(Nb," ").replace(wa,""):""},string:function(a){return H(a)?a:"string"===typeof a?a.replace(Nb," "):a}});h.extend(!0,p.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,
b,c,d){var e=c.idx;h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(f,g,h,i){if(a===g){b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(i[e]=="asc"?d.sSortAsc:i[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(i[e]=="asc"?d.sSortJUIAsc:
i[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});p.render={number:function(a,b,c,d){return{display:function(e){var f=0>e?"-":"",e=Math.abs(parseFloat(e)),g=parseInt(e,10),e=c?b+(e-g).toFixed(c).substring(2):"";return f+(d||"")+g.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+e}}}};h.extend(p.ext.internal,{_fnExternApiFunc:Mb,_fnBuildAjax:na,_fnAjaxUpdate:jb,_fnAjaxParameters:sb,_fnAjaxUpdateDraw:tb,_fnAjaxDataSrc:oa,_fnAddColumn:Aa,_fnColumnOptions:fa,_fnAdjustColumnSizing:V,_fnVisibleToColumnIndex:ga,
_fnColumnIndexToVisible:Y,_fnVisbleColumns:Z,_fnGetColumns:X,_fnColumnTypes:Da,_fnApplyColumnDefs:hb,_fnHungarianMap:T,_fnCamelToHungarian:G,_fnLanguageCompat:N,_fnBrowserDetect:fb,_fnAddData:I,_fnAddTr:ha,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==l?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:A,_fnSetCellData:Ea,_fnSplitObjNotation:Ga,_fnGetObjectDataFn:U,_fnSetObjectDataFn:Ba,_fnGetDataMaster:Ha,_fnClearTable:ja,
_fnDeleteIndex:ka,_fnInvalidateRow:la,_fnGetRowElements:ia,_fnCreateTr:Fa,_fnBuildHead:ib,_fnDrawHead:ba,_fnDraw:K,_fnReDraw:L,_fnAddOptionsHtml:lb,_fnDetectHeader:aa,_fnGetUniqueThs:ma,_fnFeatureHtmlFilter:nb,_fnFilterComplete:ca,_fnFilterCustom:wb,_fnFilterColumn:vb,_fnFilter:ub,_fnFilterCreateSearch:Na,_fnEscapeRegex:Oa,_fnFilterData:xb,_fnFeatureHtmlInfo:qb,_fnUpdateInfo:Ab,_fnInfoMacros:Bb,_fnInitialise:ra,_fnInitComplete:pa,_fnLengthChange:Pa,_fnFeatureHtmlLength:mb,_fnFeatureHtmlPaginate:rb,
_fnPageChange:Ra,_fnFeatureHtmlProcessing:ob,_fnProcessingDisplay:B,_fnFeatureHtmlTable:pb,_fnScrollDraw:W,_fnApplyToChildren:F,_fnCalculateColumnWidths:Ca,_fnThrottle:Ma,_fnConvertToWidth:Cb,_fnScrollingWidthAdjust:Eb,_fnGetWidestNode:Db,_fnGetMaxLenString:Fb,_fnStringToCss:s,_fnScrollBarWidth:Gb,_fnSortFlatten:R,_fnSort:kb,_fnSortAria:Ib,_fnSortListener:Sa,_fnSortAttachListener:Ka,_fnSortingClasses:sa,_fnSortData:Hb,_fnSaveState:ta,_fnLoadState:Jb,_fnSettingsFromNode:ua,_fnLog:P,_fnMap:D,_fnBindAction:Ta,
_fnCallbackReg:x,_fnCallbackFire:u,_fnLengthOverflow:Qa,_fnRenderer:La,_fnDataSource:z,_fnRowAttributes:Ia,_fnCalculateEnd:function(){}});h.fn.dataTable=p;h.fn.dataTableSettings=p.settings;h.fn.dataTableExt=p.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(p,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable};"function"===typeof define&&define.amd?define("datatables",["jquery"],N):"object"===typeof exports?N(require("jquery")):jQuery&&!jQuery.fn.dataTable&&N(jQuery)})(window,
document);

/* Set the defaults for DataTables initialisation */
$.extend( true, $.fn.dataTable.defaults, {
	"sDom":
		"<'row'<'col-xs-6'l><'col-xs-6'f>r>"+
		"t"+
		"<'row'<'col-xs-6'i><'col-xs-6'p>>",
	"oLanguage": {
		"sLengthMenu": "Display _MENU_ records"
	}
} );


/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline",
	"sFilterInput": "form-control input-sm",
	"sLengthSelect": "form-control input-sm"
} );

// In 1.10 we use the pagination renderers to draw the Bootstrap paging,
// rather than  custom plug-in
if ( $.fn.dataTable.Api ) {
	$.fn.dataTable.defaults.renderer = 'bootstrap';
	$.fn.dataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
		var api = new $.fn.dataTable.Api( settings );
		var classes = settings.oClasses;
		var lang = settings.oLanguage.oPaginate;
		var btnDisplay, btnClass;

		var attach = function( container, buttons ) {
			var i, ien, node, button;
			var clickHandler = function ( e ) {
				e.preventDefault();
				if ( e.data.action !== 'ellipsis' ) {
					api.page( e.data.action ).draw( false );
				}
			};

			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				button = buttons[i];

				if ( $.isArray( button ) ) {
					attach( container, button );
				}
				else {
					btnDisplay = '';
					btnClass = '';

					switch ( button ) {
						case 'ellipsis':
							btnDisplay = '&hellip;';
							btnClass = 'disabled';
							break;

						case 'first':
							btnDisplay = lang.sFirst;
							btnClass = button + (page > 0 ?
								'' : ' disabled');
							break;

						case 'previous':
							btnDisplay = lang.sPrevious;
							btnClass = button + (page > 0 ?
								'' : ' disabled');
							break;

						case 'next':
							btnDisplay = lang.sNext;
							btnClass = button + (page < pages-1 ?
								'' : ' disabled');
							break;

						case 'last':
							btnDisplay = lang.sLast;
							btnClass = button + (page < pages-1 ?
								'' : ' disabled');
							break;

						default:
							btnDisplay = button + 1;
							btnClass = page === button ?
								'active' : '';
							break;
					}

					if ( btnDisplay ) {
						node = $('<li>', {
								'class': classes.sPageButton+' '+btnClass,
								'aria-controls': settings.sTableId,
								'tabindex': settings.iTabIndex,
								'id': idx === 0 && typeof button === 'string' ?
									settings.sTableId +'_'+ button :
									null
							} )
							.append( $('<a>', {
									'href': '#'
								} )
								.html( btnDisplay )
							)
							.appendTo( container );

						settings.oApi._fnBindAction(
							node, {action: button}, clickHandler
						);
					}
				}
			}
		};

		attach(
			$(host).empty().html('<ul class="pagination"/>').children('ul'),
			buttons
		);
	}
}
else {
	// Integration for 1.9-
	$.fn.dataTable.defaults.sPaginationType = 'bootstrap';

	/* API method to get paging information */
	$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
	{
		return {
			"iStart":         oSettings._iDisplayStart,
			"iEnd":           oSettings.fnDisplayEnd(),
			"iLength":        oSettings._iDisplayLength,
			"iTotal":         oSettings.fnRecordsTotal(),
			"iFilteredTotal": oSettings.fnRecordsDisplay(),
			"iPage":          oSettings._iDisplayLength === -1 ?
				0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
			"iTotalPages":    oSettings._iDisplayLength === -1 ?
				0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
		};
	};

	/* Bootstrap style pagination control */
	$.extend( $.fn.dataTableExt.oPagination, {
		"bootstrap": {
			"fnInit": function( oSettings, nPaging, fnDraw ) {
				var oLang = oSettings.oLanguage.oPaginate;
				var fnClickHandler = function ( e ) {
					e.preventDefault();
					if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
						fnDraw( oSettings );
					}
				};

				//Pagination Buttons
				$(nPaging).append(
					'<ul class="pagination">'+
						'<li class="prev disabled"><a href="#"><i class="fa fa-angle-double-left"></i></a></li>'+//first
						'<li class="prev disabled"><a href="#"><i class="fa fa-angle-left"></i></a></li>'+//next
						'<li class="next disabled"><a href="#"><i class="fa fa-angle-right"></i></a></li>'+//prev
						'<li class="next disabled"><a href="#"><i class="fa fa-angle-double-right"></i></a></li>'+//last
					'</ul>'
				);
				var els = $('a', nPaging);
				$(els[0]).bind( 'click.DT', { action: "first" }, fnClickHandler );//first
				$(els[1]).bind( 'click.DT', { action: "previous" }, fnClickHandler );//next
				$(els[2]).bind( 'click.DT', { action: "next" }, fnClickHandler );//prev
				$(els[3]).bind( 'click.DT', { action: "last" }, fnClickHandler );//last
				//if you don't want the "first & last" buttons, you can remove the relevant HTML line and event handlers
			},

			"fnUpdate": function ( oSettings, fnDraw ) {
				var iListLength = 5;
				var oPaging = oSettings.oInstance.fnPagingInfo();
				var an = oSettings.aanFeatures.p;
				var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

				if ( oPaging.iTotalPages < iListLength) {
					iStart = 1;
					iEnd = oPaging.iTotalPages;
				}
				else if ( oPaging.iPage <= iHalf ) {
					iStart = 1;
					iEnd = iListLength;
				} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
					iStart = oPaging.iTotalPages - iListLength + 1;
					iEnd = oPaging.iTotalPages;
				} else {
					iStart = oPaging.iPage - iHalf + 1;
					iEnd = iStart + iListLength - 1;
				}

				for ( i=0, ien=an.length ; i<ien ; i++ ) {
					// Remove the middle elements
					$('li:gt(0)', an[i]).filter(':not(.next,.prev)').remove();//ACE

					// Add the new list items and their event handlers
					for ( j=iStart ; j<=iEnd ; j++ ) {
						sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
						$('<li '+sClass+'><a href="#">'+j+'</a></li>')
							.insertBefore( $('li.next:eq(0)', an[i])[0] )//ACE
							.bind('click', function (e) {
								e.preventDefault();
								oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
								fnDraw( oSettings );
							} );
					}

					// Add / remove disabled classes from the static elements
					//ACE
					if ( oPaging.iPage === 0 ) {
						$('li.prev', an[i]).addClass('disabled');
					} else {
						$('li.prev', an[i]).removeClass('disabled');
					}
	 
					if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
						$('li.next', an[i]).addClass('disabled');
					} else {
						$('li.next', an[i]).removeClass('disabled');
					}
				}
			}
		}
	} );
}


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( $.fn.DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend( true, $.fn.DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn btn-default",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	$.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}


/*! Responsive 1.0.2
 * 2014 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     1.0.2
 * @file        dataTables.responsive.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function(window, document, undefined) {


var factory = function( $, DataTable ) {
"use strict";

/**
 * Responsive is a plug-in for the DataTables library that makes use of
 * DataTables' ability to change the visibility of columns, changing the
 * visibility of columns so the displayed columns fit into the table container.
 * The end result is that complex tables will be dynamically adjusted to fit
 * into the viewport, be it on a desktop, tablet or mobile browser.
 *
 * Responsive for DataTables has two modes of operation, which can used
 * individually or combined:
 *
 * * Class name based control - columns assigned class names that match the
 *   breakpoint logic can be shown / hidden as required for each breakpoint.
 * * Automatic control - columns are automatically hidden when there is no
 *   room left to display them. Columns removed from the right.
 *
 * In additional to column visibility control, Responsive also has built into
 * options to use DataTables' child row display to show / hide the information
 * from the table that has been hidden. There are also two modes of operation
 * for this child row display:
 *
 * * Inline - when the control element that the user can use to show / hide
 *   child rows is displayed inside the first column of the table.
 * * Column - where a whole column is dedicated to be the show / hide control.
 *
 * Initialisation of Responsive is performed by:
 *
 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
 *   Responsive will automatically be initialised with the default configuration
 *   options when the DataTable is created.
 * * Using the `responsive` option in the DataTables configuration options. This
 *   can also be used to specify the configuration options, or simply set to
 *   `true` to use the defaults.
 *
 *  @class
 *  @param {object} settings DataTables settings object for the host table
 *  @param {object} [opts] Configuration options
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.1+
 *
 *  @example
 *      $('#example').DataTable( {
 *        responsive: true
 *      } );
 *    } );
 */
var Responsive = function ( settings, opts ) {
    // Sanity check that we are using DataTables 1.10 or newer
    if ( ! DataTable.versionCheck || ! DataTable.versionCheck( '1.10.1' ) ) {
        throw 'DataTables Responsive requires DataTables 1.10.1 or newer';
    }

    this.s = {
        dt: new DataTable.Api( settings ),
        columns: []
    };

    // Check if responsive has already been initialised on this table
    if ( this.s.dt.settings()[0].responsive ) {
        return;
    }

    // details is an object, but for simplicity the user can give it as a string
    if ( opts && typeof opts.details === 'string' ) {
        opts.details = { type: opts.details };
    }

    this.c = $.extend( true, {}, Responsive.defaults, DataTable.defaults.responsive, opts );
    settings.responsive = this;
    this._constructor();
};

Responsive.prototype = {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Constructor
     */

    /**
     * Initialise the Responsive instance
     *
     * @private
     */
    _constructor: function ()
    {
        var that = this;
        var dt = this.s.dt;

        dt.settings()[0]._responsive = this;

        // Use DataTables' private throttle function to avoid processor thrashing
        $(window).on( 'resize.dtr orientationchange.dtr', dt.settings()[0].oApi._fnThrottle( function () {
            that._resize();
        } ) );

        // Destroy event handler
        dt.on( 'destroy.dtr', function () {
            $(window).off( 'resize.dtr orientationchange.dtr' );
        } );

        // Reorder the breakpoints array here in case they have been added out
        // of order
        this.c.breakpoints.sort( function (a, b) {
            return a.width < b.width ? 1 :
                a.width > b.width ? -1 : 0;
        } );

        // Determine which columns are already hidden, and should therefore
        // remain hidden. TODO - should this be done? See thread 22677
        //
        // this.s.alwaysHidden = dt.columns(':hidden').indexes();

        this._classLogic();
        this._resizeAuto();

        // First pass - draw the table for the current viewport size
        this._resize();

        // Details handler
        var details = this.c.details;
        if ( details.type ) {
            that._detailsInit();
            this._detailsVis();

            dt.on( 'column-visibility.dtr', function () {
                that._detailsVis();
            } );

            $(dt.table().node()).addClass( 'dtr-'+details.type );
        }
    },


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Private methods
     */

    /**
     * Calculate the visibility for the columns in a table for a given
     * breakpoint. The result is pre-determined based on the class logic if
     * class names are used to control all columns, but the width of the table
     * is also used if there are columns which are to be automatically shown
     * and hidden.
     *
     * @param  {string} breakpoint Breakpoint name to use for the calculation
     * @return {array} Array of boolean values initiating the visibility of each
     *   column.
     *  @private
     */
    _columnsVisiblity: function ( breakpoint )
    {
        var dt = this.s.dt;
        var columns = this.s.columns;
        var i, ien;

        // Class logic - determine which columns are in this breakpoint based
        // on the classes. If no class control (i.e. `auto`) then `-` is used
        // to indicate this to the rest of the function
        var display = $.map( columns, function ( col ) {
            return col.auto && col.minWidth === null ?
                false :
                col.auto === true ?
                    '-' :
                    $.inArray( breakpoint, col.includeIn ) !== -1;
        } );

        // Auto column control - first pass: how much width is taken by the
        // ones that must be included from the non-auto columns
        var requiredWidth = 0;
        for ( i=0, ien=display.length ; i<ien ; i++ ) {
            if ( display[i] === true ) {
                requiredWidth += columns[i].minWidth;
            }
        }

        // Second pass, use up any remaining width for other columns
        var widthAvailable = dt.table().container().offsetWidth;
        var usedWidth = widthAvailable - requiredWidth;

        for ( i=0, ien=display.length ; i<ien ; i++ ) {
            // Control column needs to always be included. This makes it sub-
            // optimal in terms of using the available with, but to stop layout
            // thrashing or overflow
            if ( columns[i].control ) {
                usedWidth -= columns[i].minWidth;
            }
            else if ( display[i] === '-' ) {
                // Otherwise, remove the width
                display[i] = usedWidth - columns[i].minWidth < 0 ?
                    false :
                    true;

                // Continue counting down the width, so a smaller column to the
                // left won't be shown
                usedWidth -= columns[i].minWidth;
            }
        }

        // Determine if the 'control' column should be shown (if there is one).
        // This is the case when there is a hidden column (that is not the
        // control column). The two loops look inefficient here, but they are
        // trivial and will fly through. We need to know the outcome from the
        // first , before the action in the second can be taken
        var showControl = false;

        for ( i=0, ien=columns.length ; i<ien ; i++ ) {
            if ( ! columns[i].control && ! columns[i].never && ! display[i] ) {
                showControl = true;
                break;
            }
        }

        for ( i=0, ien=columns.length ; i<ien ; i++ ) {
            if ( columns[i].control ) {
                display[i] = showControl;
            }
        }

        // Finally we need to make sure that there is at least one column that
        // is visible
        if ( $.inArray( true, display ) === -1 ) {
            display[0] = true;
        }

        return display;
    },


    /**
     * Create the internal `columns` array with information about the columns
     * for the table. This includes determining which breakpoints the column
     * will appear in, based upon class names in the column, which makes up the
     * vast majority of this method.
     *
     * @private
     */
    _classLogic: function ()
    {
        var that = this;
        var calc = {};
        var breakpoints = this.c.breakpoints;
        var columns = this.s.dt.columns().eq(0).map( function (i) {
            var className = this.column(i).header().className;

            return {
                className: className,
                includeIn: [],
                auto:      false,
                control:   false,
                never:     className.match(/\bnever\b/) ? true : false
            };
        } );

        // Simply add a breakpoint to `includeIn` array, ensuring that there are
        // no duplicates
        var add = function ( colIdx, name ) {
            var includeIn = columns[ colIdx ].includeIn;

            if ( $.inArray( name, includeIn ) === -1 ) {
                includeIn.push( name );
            }
        };

        var column = function ( colIdx, name, operator, matched ) {
            var size, i, ien;

            if ( ! operator ) {
                columns[ colIdx ].includeIn.push( name );
            }
            else if ( operator === 'max-' ) {
                // Add this breakpoint and all smaller
                size = that._find( name ).width;

                for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
                    if ( breakpoints[i].width <= size ) {
                        add( colIdx, breakpoints[i].name );
                    }
                }
            }
            else if ( operator === 'min-' ) {
                // Add this breakpoint and all larger
                size = that._find( name ).width;

                for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
                    if ( breakpoints[i].width >= size ) {
                        add( colIdx, breakpoints[i].name );
                    }
                }
            }
            else if ( operator === 'not-' ) {
                // Add all but this breakpoint (xxx need extra information)

                for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
                    if ( breakpoints[i].name.indexOf( matched ) === -1 ) {
                        add( colIdx, breakpoints[i].name );
                    }
                }
            }
        };

        // Loop over each column and determine if it has a responsive control
        // class
        columns.each( function ( col, i ) {
            var classNames = col.className.split(' ');
            var hasClass = false;

            // Split the class name up so multiple rules can be applied if needed
            for ( var k=0, ken=classNames.length ; k<ken ; k++ ) {
                var className = $.trim( classNames[k] );

                if ( className === 'all' ) {
                    // Include in all
                    hasClass = true;
                    col.includeIn = $.map( breakpoints, function (a) {
                        return a.name;
                    } );
                    return;
                }
                else if ( className === 'none' || className === 'never' ) {
                    // Include in none (default) and no auto
                    hasClass = true;
                    return;
                }
                else if ( className === 'control' ) {
                    // Special column that is only visible, when one of the other
                    // columns is hidden. This is used for the details control
                    hasClass = true;
                    col.control = true;
                    return;
                }

                $.each( breakpoints, function ( j, breakpoint ) {
                    // Does this column have a class that matches this breakpoint?
                    var brokenPoint = breakpoint.name.split('-');
                    var re = new RegExp( '(min\\-|max\\-|not\\-)?('+brokenPoint[0]+')(\\-[_a-zA-Z0-9])?' );
                    var match = className.match( re );

                    if ( match ) {
                        hasClass = true;

                        if ( match[2] === brokenPoint[0] && match[3] === '-'+brokenPoint[1] ) {
                            // Class name matches breakpoint name fully
                            column( i, breakpoint.name, match[1], match[2]+match[3] );
                        }
                        else if ( match[2] === brokenPoint[0] && ! match[3] ) {
                            // Class name matched primary breakpoint name with no qualifier
                            column( i, breakpoint.name, match[1], match[2] );
                        }
                    }
                } );
            }

            // If there was no control class, then automatic sizing is used
            if ( ! hasClass ) {
                col.auto = true;
            }
        } );

        this.s.columns = columns;
    },


    /**
     * Initialisation for the details handler
     *
     * @private
     */
    _detailsInit: function ()
    {
        var that    = this;
        var dt      = this.s.dt;
        var details = this.c.details;

        // The inline type always uses the first child as the target
        if ( details.type === 'inline' ) {
            details.target = 'td:first-child';
        }

        // type.target can be a string jQuery selector or a column index
        var target   = details.target;
        var selector = typeof target === 'string' ? target : 'td';

        // Click handler to show / hide the details rows when they are available
        $( dt.table().body() ).on( 'click', selector, function (e) {
            // If the table is not collapsed (i.e. there is no hidden columns)
            // then take no action
            if ( ! $(dt.table().node()).hasClass('collapsed' ) ) {
                return;
            }

            // Check that the row is actually a DataTable's controlled node
            if ( ! dt.row( $(this).closest('tr') ).length ) {
                return;
            }

            // For column index, we determine if we should act or not in the
            // handler - otherwise it is already okay
            if ( typeof target === 'number' ) {
                var targetIdx = target < 0 ?
                    dt.columns().eq(0).length + target :
                    target;

                if ( dt.cell( this ).index().column !== targetIdx ) {
                    return;
                }
            }

            // $().closest() includes itself in its check
            var row = dt.row( $(this).closest('tr') );

            if ( row.child.isShown() ) {
                row.child( false );
                $( row.node() ).removeClass( 'parent' );
            }
            else {
                var info = that.c.details.renderer( dt, row[0] );
                row.child( info, 'child' ).show();
                $( row.node() ).addClass( 'parent' );
            }
        } );
    },


    /**
     * Update the child rows in the table whenever the column visibility changes
     *
     * @private
     */
    _detailsVis: function ()
    {
        var that = this;
        var dt = this.s.dt;

        // Find how many columns are hidden
        var hiddenColumns = dt.columns().indexes().filter( function ( idx ) {
            var col = dt.column( idx );

            if ( col.visible() ) {
                return null;
            }

            // Only counts as hidden if it doesn't have the `never` class
            return $( col.header() ).hasClass( 'never' ) ? null : idx;
        } );
        var haveHidden = true;

        if ( hiddenColumns.length === 0 || ( hiddenColumns.length === 1 && this.s.columns[ hiddenColumns[0] ].control ) ) {
            haveHidden = false;
        }

        if ( haveHidden ) {
            // Got hidden columns
            $( dt.table().node() ).addClass('collapsed');

            // Show all existing child rows
            dt.rows().eq(0).each( function (idx) {
                var row = dt.row( idx );

                if ( row.child() ) {
                    var info = that.c.details.renderer( dt, row[0] );

                    // The renderer can return false to have no child row
                    if ( info === false ) {
                        row.child.hide();
                    }
                    else {
                        row.child( info, 'child' ).show();
                    }
                }
            } );
        }
        else {
            // No hidden columns
            $( dt.table().node() ).removeClass('collapsed');

            // Hide all existing child rows
            dt.rows().eq(0).each( function (idx) {
                dt.row( idx ).child.hide();
            } );
        }
    },


    /**
     * Find a breakpoint object from a name
     * @param  {string} name Breakpoint name to find
     * @return {object}      Breakpoint description object
     */
    _find: function ( name )
    {
        var breakpoints = this.c.breakpoints;

        for ( var i=0, ien=breakpoints.length ; i<ien ; i++ ) {
            if ( breakpoints[i].name === name ) {
                return breakpoints[i];
            }
        }
    },


    /**
     * Alter the table display for a resized viewport. This involves first
     * determining what breakpoint the window currently is in, getting the
     * column visibilities to apply and then setting them.
     *
     * @private
     */
    _resize: function ()
    {
        var dt = this.s.dt;
        var width = $(window).width();
        var breakpoints = this.c.breakpoints;
        var breakpoint = breakpoints[0].name;

        // Determine what breakpoint we are currently at
        for ( var i=breakpoints.length-1 ; i>=0 ; i-- ) {
            if ( width <= breakpoints[i].width ) {
                breakpoint = breakpoints[i].name;
                break;
            }
        }
        
        // Show the columns for that break point
        var columns = this._columnsVisiblity( breakpoint );

        dt.columns().eq(0).each( function ( colIdx, i ) {
            dt.column( colIdx ).visible( columns[i] );
        } );
    },


    /**
     * Determine the width of each column in the table so the auto column hiding
     * has that information to work with. This method is never going to be 100%
     * perfect since column widths can change slightly per page, but without
     * seriously compromising performance this is quite effective.
     *
     * @private
     */
    _resizeAuto: function ()
    {
        var dt = this.s.dt;
        var columns = this.s.columns;

        // Are we allowed to do auto sizing?
        if ( ! this.c.auto ) {
            return;
        }

        // Are there any columns that actually need auto-sizing, or do they all
        // have classes defined
        if ( $.inArray( true, $.map( columns, function (c) { return c.auto; } ) ) === -1 ) {
            return;
        }

        // Clone the table with the current data in it
        var tableWidth   = dt.table().node().offsetWidth;
        var columnWidths = dt.columns;
        var clonedTable  = dt.table().node().cloneNode( false );
        var clonedHeader = $( dt.table().header().cloneNode( false ) ).appendTo( clonedTable );
        var clonedBody   = $( dt.table().body().cloneNode( false ) ).appendTo( clonedTable );

        // This is a bit slow, but we need to get a clone of each row that
        // includes all columns. As such, try to do this as little as possible.
        dt.rows( { page: 'current' } ).indexes().flatten().each( function ( idx ) {
            var clone = dt.row( idx ).node().cloneNode( true );
            
            if ( dt.columns( ':hidden' ).flatten().length ) {
                $(clone).append( dt.cells( idx, ':hidden' ).nodes().to$().clone() );
            }

            $(clone).appendTo( clonedBody );
        } );

        var cells        = dt.columns().header().to$().clone( false ).wrapAll('tr').appendTo( clonedHeader );
        var inserted     = $('<div/>')
            .css( {
                width: 1,
                height: 1,
                overflow: 'hidden'
            } )
            .append( clonedTable )
            .insertBefore( dt.table().node() );

        // The cloned header now contains the smallest that each column can be
        dt.columns().eq(0).each( function ( idx ) {
            columns[idx].minWidth = cells[ idx ].offsetWidth || 0;
        } );

        inserted.remove();
    }
};


/**
 * List of default breakpoints. Each item in the array is an object with two
 * properties:
 *
 * * `name` - the breakpoint name.
 * * `width` - the breakpoint width
 *
 * @name Responsive.breakpoints
 * @static
 */
Responsive.breakpoints = [
    { name: 'desktop',  width: Infinity },
    { name: 'tablet-l', width: 1024 },
    { name: 'tablet-p', width: 768 },
    { name: 'mobile-l', width: 480 },
    { name: 'mobile-p', width: 320 }
];


/**
 * Responsive default settings for initialisation
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.defaults = {
    /**
     * List of breakpoints for the instance. Note that this means that each
     * instance can have its own breakpoints. Additionally, the breakpoints
     * cannot be changed once an instance has been creased.
     *
     * @type {Array}
     * @default Takes the value of `Responsive.breakpoints`
     */
    breakpoints: Responsive.breakpoints,

    /**
     * Enable / disable auto hiding calculations. It can help to increase
     * performance slightly if you disable this option, but all columns would
     * need to have breakpoint classes assigned to them
     *
     * @type {Boolean}
     * @default  `true`
     */
    auto: true,

    /**
     * Details control. If given as a string value, the `type` property of the
     * default object is set to that value, and the defaults used for the rest
     * of the object - this is for ease of implementation.
     *
     * The object consists of the following properties:
     *
     * * `renderer` - function that is called for display of the child row data.
     *   The default function will show the data from the hidden columns
     * * `target` - Used as the selector for what objects to attach the child
     *   open / close to
     * * `type` - `false` to disable the details display, `inline` or `column`
     *   for the two control types
     *
     * @type {Object|string}
     */
    details: {
        renderer: function ( api, rowIdx ) {
            var data = api.cells( rowIdx, ':hidden' ).eq(0).map( function ( cell ) {
                var header = $( api.column( cell.column ).header() );
                var idx = api.cell( cell ).index();

                if ( header.hasClass( 'control' ) || header.hasClass( 'never' ) ) {
                    return '';
                }

                // Use a non-public DT API method to render the data for display
                // This needs to be updated when DT adds a suitable method for
                // this type of data retrieval
                var dtPrivate = api.settings()[0];
                var cellData = dtPrivate.oApi._fnGetCellData(
                    dtPrivate, idx.row, idx.column, 'display'
                );

                return '<li data-dtr-index="'+idx.column+'">'+
                        '<span class="dtr-title">'+
                            header.text()+':'+
                        '</span> '+
                        '<span class="dtr-data">'+
                            cellData+
                        '</span>'+
                    '</li>';
            } ).toArray().join('');

            return data ?
                $('<ul data-dtr-index="'+rowIdx+'"/>').append( data ) :
                false;
        },

        target: 0,

        type: 'inline'
    }
};


/*
 * API
 */
var Api = $.fn.dataTable.Api;

// Doesn't do anything - work around for a bug in DT... Not documented
Api.register( 'responsive()', function () {
    return this;
} );

Api.register( 'responsive.recalc()', function () {
    this.iterator( 'table', function ( ctx ) {
        if ( ctx._responsive ) {
            ctx._responsive._resizeAuto();
            ctx._responsive._resize();
        }
    } );
} );

Api.register( 'responsive.index()', function ( li ) {
    li = $(li);

    return {
        column: li.data('dtr-index'),
        row:    li.parent().data('dtr-index')
    };
} );


/**
 * Version information
 *
 * @name Responsive.version
 * @static
 */
Responsive.version = '1.0.2';


$.fn.dataTable.Responsive = Responsive;
$.fn.DataTable.Responsive = Responsive;

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'init.dt.dtr', function (e, settings, json) {
    if ( $(settings.nTable).hasClass( 'responsive' ) ||
         $(settings.nTable).hasClass( 'dt-responsive' ) ||
         settings.oInit.responsive ||
         DataTable.defaults.responsive
    ) {
        var init = settings.oInit.responsive;

        if ( init !== false ) {
            new Responsive( settings, $.isPlainObject( init ) ? init : {}  );
        }
    }
} );

return Responsive;
}; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
    define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if ( jQuery && !jQuery.fn.dataTable.Responsive ) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory( jQuery, jQuery.fn.dataTable );
}


})(window, document);


//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return zb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){tb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return m(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){qc[a]||(e(b),qc[a]=!0)}function h(a,b){return function(c){return p(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(){}function k(a,b){b!==!1&&F(a),n(this,a),this._d=new Date(+a._d)}function l(a){var b=y(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=tb.localeData(),this._bubble()}function m(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function n(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Ib.length>0)for(c in Ib)d=Ib[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function o(a){return 0>a?Math.ceil(a):Math.floor(a)}function p(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function q(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function r(a,b){var c;return b=K(b,a),a.isBefore(b)?c=q(a,b):(c=q(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function s(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=tb.duration(c,d),t(this,e,a),this}}function t(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&nb(a,"Date",mb(a,"Date")+f*c),g&&lb(a,mb(a,"Month")+g*c),d&&tb.updateOffset(a,f||g)}function u(a){return"[object Array]"===Object.prototype.toString.call(a)}function v(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function w(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&A(a[d])!==A(b[d]))&&g++;return g+f}function x(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=jc[a]||kc[b]||b}return a}function y(a){var b,d,e={};for(d in a)c(a,d)&&(b=x(d),b&&(e[b]=a[d]));return e}function z(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}tb[b]=function(e,f){var g,h,i=tb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=tb().utc().set(d,a);return i.call(tb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function A(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function B(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function C(a,b,c){return hb(tb([a,11,31+b-c]),b,c).week}function D(a){return E(a)?366:365}function E(a){return a%4===0&&a%100!==0||a%400===0}function F(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Bb]<0||a._a[Bb]>11?Bb:a._a[Cb]<1||a._a[Cb]>B(a._a[Ab],a._a[Bb])?Cb:a._a[Db]<0||a._a[Db]>23?Db:a._a[Eb]<0||a._a[Eb]>59?Eb:a._a[Fb]<0||a._a[Fb]>59?Fb:a._a[Gb]<0||a._a[Gb]>999?Gb:-1,a._pf._overflowDayOfYear&&(Ab>b||b>Cb)&&(b=Cb),a._pf.overflow=b)}function G(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function H(a){return a?a.toLowerCase().replace("_","-"):a}function I(a){for(var b,c,d,e,f=0;f<a.length;){for(e=H(a[f]).split("-"),b=e.length,c=H(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=J(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&w(e,c,!0)>=b-1)break;b--}f++}return null}function J(a){var b=null;if(!Hb[a]&&Jb)try{b=tb.locale(),require("./locale/"+a),tb.locale(b)}catch(c){}return Hb[a]}function K(a,b){return b._isUTC?tb(a).zone(b._offset||0):tb(a).local()}function L(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function M(a){var b,c,d=a.match(Nb);for(b=0,c=d.length;c>b;b++)d[b]=pc[d[b]]?pc[d[b]]:L(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function N(a,b){return a.isValid()?(b=O(b,a.localeData()),lc[b]||(lc[b]=M(b)),lc[b](a)):a.localeData().invalidDate()}function O(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Ob.lastIndex=0;d>=0&&Ob.test(a);)a=a.replace(Ob,c),Ob.lastIndex=0,d-=1;return a}function P(a,b){var c,d=b._strict;switch(a){case"Q":return Zb;case"DDDD":return _b;case"YYYY":case"GGGG":case"gggg":return d?ac:Rb;case"Y":case"G":case"g":return cc;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?bc:Sb;case"S":if(d)return Zb;case"SS":if(d)return $b;case"SSS":if(d)return _b;case"DDD":return Qb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ub;case"a":case"A":return b._locale._meridiemParse;case"X":return Xb;case"Z":case"ZZ":return Vb;case"T":return Wb;case"SSSS":return Tb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?$b:Pb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Pb;case"Do":return Yb;default:return c=new RegExp(Y(X(a.replace("\\","")),"i"))}}function Q(a){a=a||"";var b=a.match(Vb)||[],c=b[b.length-1]||[],d=(c+"").match(hc)||["-",0,0],e=+(60*d[1])+A(d[2]);return"+"===d[0]?-e:e}function R(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Bb]=3*(A(b)-1));break;case"M":case"MM":null!=b&&(e[Bb]=A(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b),null!=d?e[Bb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Cb]=A(b));break;case"Do":null!=b&&(e[Cb]=A(parseInt(b,10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=A(b));break;case"YY":e[Ab]=tb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Ab]=A(b);break;case"a":case"A":c._isPm=c._locale.isPM(b);break;case"H":case"HH":case"h":case"hh":e[Db]=A(b);break;case"m":case"mm":e[Eb]=A(b);break;case"s":case"ss":e[Fb]=A(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Gb]=A(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=Q(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=A(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=tb.parseTwoDigitYear(b)}}function S(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Ab],hb(tb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Ab],hb(tb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=ib(d,e,f,h,g),a._a[Ab]=i.year,a._dayOfYear=i.dayOfYear}function T(a){var c,d,e,f,g=[];if(!a._d){for(e=V(a),a._w&&null==a._a[Cb]&&null==a._a[Bb]&&S(a),a._dayOfYear&&(f=b(a._a[Ab],e[Ab]),a._dayOfYear>D(f)&&(a._pf._overflowDayOfYear=!0),d=db(f,0,a._dayOfYear),a._a[Bb]=d.getUTCMonth(),a._a[Cb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];a._d=(a._useUTC?db:cb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()+a._tzm)}}function U(a){var b;a._d||(b=y(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],T(a))}function V(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function W(a){if(a._f===tb.ISO_8601)return void $(a);a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=""+a._i,h=g.length,i=0;for(d=O(a._f,a._locale).match(Nb)||[],b=0;b<d.length;b++)e=d[b],c=(g.match(P(e,a))||[])[0],c&&(f=g.substr(0,g.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),g=g.slice(g.indexOf(c)+c.length),i+=c.length),pc[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),R(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=h-i,g.length>0&&a._pf.unusedInput.push(g),a._isPm&&a._a[Db]<12&&(a._a[Db]+=12),a._isPm===!1&&12===a._a[Db]&&(a._a[Db]=0),T(a),F(a)}function X(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function Y(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Z(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],W(b),G(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));m(a,c||b)}function $(a){var b,c,d=a._i,e=dc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=fc.length;c>b;b++)if(fc[b][1].exec(d)){a._f=fc[b][0]+(e[6]||" ");break}for(b=0,c=gc.length;c>b;b++)if(gc[b][1].exec(d)){a._f+=gc[b][0];break}d.match(Vb)&&(a._f+="Z"),W(a)}else a._isValid=!1}function _(a){$(a),a._isValid===!1&&(delete a._isValid,tb.createFromInputFallback(a))}function ab(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function bb(b){var c,d=b._i;d===a?b._d=new Date:v(d)?b._d=new Date(+d):null!==(c=Kb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?_(b):u(d)?(b._a=ab(d.slice(0),function(a){return parseInt(a,10)}),T(b)):"object"==typeof d?U(b):"number"==typeof d?b._d=new Date(d):tb.createFromInputFallback(b)}function cb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function db(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function eb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function fb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function gb(a,b,c){var d=tb.duration(a).abs(),e=yb(d.as("s")),f=yb(d.as("m")),g=yb(d.as("h")),h=yb(d.as("d")),i=yb(d.as("M")),j=yb(d.as("y")),k=e<mc.s&&["s",e]||1===f&&["m"]||f<mc.m&&["mm",f]||1===g&&["h"]||g<mc.h&&["hh",g]||1===h&&["d"]||h<mc.d&&["dd",h]||1===i&&["M"]||i<mc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,fb.apply({},k)}function hb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=tb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ib(a,b,c,d,e){var f,g,h=db(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:D(a-1)+g}}function jb(b){var c=b._i,d=b._f;return b._locale=b._locale||tb.localeData(b._l),null===c||d===a&&""===c?tb.invalid({nullInput:!0}):("string"==typeof c&&(b._i=c=b._locale.preparse(c)),tb.isMoment(c)?new k(c,!0):(d?u(d)?Z(b):W(b):bb(b),new k(b)))}function kb(a,b){var c,d;if(1===b.length&&u(b[0])&&(b=b[0]),!b.length)return tb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function lb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),B(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function mb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function nb(a,b,c){return"Month"===b?lb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function ob(a,b){return function(c){return null!=c?(nb(this,a,c),tb.updateOffset(this,b),this):mb(this,a)}}function pb(a){return 400*a/146097}function qb(a){return 146097*a/400}function rb(a){tb.duration.fn[a]=function(){return this._data[a]}}function sb(a){"undefined"==typeof ender&&(ub=xb.moment,xb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",tb):tb)}for(var tb,ub,vb,wb="2.8.3",xb="undefined"!=typeof global?global:this,yb=Math.round,zb=Object.prototype.hasOwnProperty,Ab=0,Bb=1,Cb=2,Db=3,Eb=4,Fb=5,Gb=6,Hb={},Ib=[],Jb="undefined"!=typeof module&&module.exports,Kb=/^\/?Date\((\-?\d+)/i,Lb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Mb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Nb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Ob=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Pb=/\d\d?/,Qb=/\d{1,3}/,Rb=/\d{1,4}/,Sb=/[+\-]?\d{1,6}/,Tb=/\d+/,Ub=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Vb=/Z|[\+\-]\d\d:?\d\d/gi,Wb=/T/i,Xb=/[\+\-]?\d+(\.\d{1,3})?/,Yb=/\d{1,2}/,Zb=/\d/,$b=/\d\d/,_b=/\d{3}/,ac=/\d{4}/,bc=/[+-]?\d{6}/,cc=/[+-]?\d+/,dc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ec="YYYY-MM-DDTHH:mm:ssZ",fc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],gc=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],hc=/([\+\-]|\d\d)/gi,ic=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),jc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},kc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},lc={},mc={s:45,m:45,h:22,d:26,M:11},nc="DDD w W M D d".split(" "),oc="M D H h m s w W".split(" "),pc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return p(this.year()%100,2)},YYYY:function(){return p(this.year(),4)},YYYYY:function(){return p(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+p(Math.abs(a),6)},gg:function(){return p(this.weekYear()%100,2)},gggg:function(){return p(this.weekYear(),4)},ggggg:function(){return p(this.weekYear(),5)},GG:function(){return p(this.isoWeekYear()%100,2)},GGGG:function(){return p(this.isoWeekYear(),4)},GGGGG:function(){return p(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return A(this.milliseconds()/100)},SS:function(){return p(A(this.milliseconds()/10),2)},SSS:function(){return p(this.milliseconds(),3)},SSSS:function(){return p(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+":"+p(A(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+p(A(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},qc={},rc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];nc.length;)vb=nc.pop(),pc[vb+"o"]=i(pc[vb],vb);for(;oc.length;)vb=oc.pop(),pc[vb+vb]=h(pc[vb],2);pc.DDDD=h(pc.DDD,3),m(j.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=tb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=tb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return hb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),tb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),jb(g)},tb.suppressDeprecationWarnings=!1,tb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)}),tb.min=function(){var a=[].slice.call(arguments,0);return kb("isBefore",a)},tb.max=function(){var a=[].slice.call(arguments,0);return kb("isAfter",a)},tb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),jb(g).utc()},tb.unix=function(a){return tb(1e3*a)},tb.duration=function(a,b){var d,e,f,g,h=a,i=null;return tb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Lb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:A(i[Cb])*d,h:A(i[Db])*d,m:A(i[Eb])*d,s:A(i[Fb])*d,ms:A(i[Gb])*d}):(i=Mb.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):"object"==typeof h&&("from"in h||"to"in h)&&(g=r(tb(h.from),tb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new l(h),tb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},tb.version=wb,tb.defaultFormat=ec,tb.ISO_8601=function(){},tb.momentProperties=Ib,tb.updateOffset=function(){},tb.relativeTimeThreshold=function(b,c){return mc[b]===a?!1:c===a?mc[b]:(mc[b]=c,!0)},tb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return tb.locale(a,b)}),tb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?tb.defineLocale(a,b):tb.localeData(a),c&&(tb.duration._locale=tb._locale=c)),tb._locale._abbr},tb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Hb[a]||(Hb[a]=new j),Hb[a].set(b),tb.locale(a),Hb[a]):(delete Hb[a],null)},tb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return tb.localeData(a)}),tb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return tb._locale;if(!u(a)){if(b=J(a))return b;a=[a]}return I(a)},tb.isMoment=function(a){return a instanceof k||null!=a&&c(a,"_isAMomentObject")},tb.isDuration=function(a){return a instanceof l};for(vb=rc.length-1;vb>=0;--vb)z(rc[vb]);tb.normalizeUnits=function(a){return x(a)},tb.invalid=function(a){var b=tb.utc(0/0);return null!=a?m(b._pf,a):b._pf.userInvalidated=!0,b},tb.parseZone=function(){return tb.apply(null,arguments).parseZone()},tb.parseTwoDigitYear=function(a){return A(a)+(A(a)>68?1900:2e3)},m(tb.fn=k.prototype,{clone:function(){return tb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=tb(this).utc();return 0<a.year()&&a.year()<=9999?N(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):N(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return G(this)},isDSTShifted:function(){return this._a?this.isValid()&&w(this._a,(this._isUTC?tb.utc(this._a):tb(this._a)).toArray())>0:!1},parsingFlags:function(){return m({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.zone(0,a)},local:function(a){return this._isUTC&&(this.zone(0,a),this._isUTC=!1,a&&this.add(this._dateTzOffset(),"m")),this},format:function(a){var b=N(this,a||tb.defaultFormat);return this.localeData().postformat(b)},add:s(1,"add"),subtract:s(-1,"subtract"),diff:function(a,b,c){var d,e,f,g=K(a,this),h=6e4*(this.zone()-g.zone());return b=x(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+g.daysInMonth()),e=12*(this.year()-g.year())+(this.month()-g.month()),f=this-tb(this).startOf("month")-(g-tb(g).startOf("month")),f-=6e4*(this.zone()-tb(this).startOf("month").zone()-(g.zone()-tb(g).startOf("month").zone())),e+=f/d,"year"===b&&(e/=12)):(d=this-g,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-h)/864e5:"week"===b?(d-h)/6048e5:d),c?e:o(e)},from:function(a,b){return tb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(tb(),a)},calendar:function(a){var b=a||tb(),c=K(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this))},isLeapYear:function(){return E(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=eb(a,this.localeData()),this.add(a-b,"d")):b},month:ob("Month",!0),startOf:function(a){switch(a=x(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(a){return a=x(a),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")},isAfter:function(a,b){return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this>+a):+this.clone().startOf(b)>+tb(a).startOf(b)},isBefore:function(a,b){return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+a>+this):+this.clone().startOf(b)<+tb(a).startOf(b)},isSame:function(a,b){return b=x(b||"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this===+a):+this.clone().startOf(b)===+K(a,this).startOf(b)},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),a>this?this:a}),zone:function(a,b){var c,d=this._offset||0;return null==a?this._isUTC?d:this._dateTzOffset():("string"==typeof a&&(a=Q(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateTzOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.subtract(c,"m"),d!==a&&(!b||this._changeInProgress?t(this,tb.duration(d-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,tb.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?tb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return B(this.year(),this.month())},dayOfYear:function(a){var b=yb((tb(this).startOf("day")-tb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=hb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=hb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=hb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return C(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return C(this.year(),a.dow,a.doy)},get:function(a){return a=x(a),this[a]()},set:function(a,b){return a=x(a),"function"==typeof this[a]&&this[a](b),this},locale:function(b){var c;return b===a?this._locale._abbr:(c=tb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Use moment().localeData() instead.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateTzOffset:function(){return 15*Math.round(this._d.getTimezoneOffset()/15)}}),tb.fn.millisecond=tb.fn.milliseconds=ob("Milliseconds",!1),tb.fn.second=tb.fn.seconds=ob("Seconds",!1),tb.fn.minute=tb.fn.minutes=ob("Minutes",!1),tb.fn.hour=tb.fn.hours=ob("Hours",!0),tb.fn.date=ob("Date",!0),tb.fn.dates=f("dates accessor is deprecated. Use date instead.",ob("Date",!0)),tb.fn.year=ob("FullYear",!0),tb.fn.years=f("years accessor is deprecated. Use year instead.",ob("FullYear",!0)),tb.fn.days=tb.fn.day,tb.fn.months=tb.fn.month,tb.fn.weeks=tb.fn.week,tb.fn.isoWeeks=tb.fn.isoWeek,tb.fn.quarters=tb.fn.quarter,tb.fn.toJSON=tb.fn.toISOString,m(tb.duration.fn=l.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=o(d/1e3),g.seconds=a%60,b=o(a/60),g.minutes=b%60,c=o(b/60),g.hours=c%24,e+=o(c/24),h=o(pb(e)),e-=o(qb(h)),f+=o(e/30),e%=30,h+=o(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*A(this._months/12)},humanize:function(a){var b=gb(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=tb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=tb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=x(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=x(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*pb(b),"month"===a?c:c/12;switch(b=this._days+qb(this._months/12),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:tb.fn.lang,locale:tb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale}}),tb.duration.fn.toString=tb.duration.fn.toISOString;for(vb in ic)c(ic,vb)&&rb(vb.toLowerCase());tb.duration.fn.asMilliseconds=function(){return this.as("ms")},tb.duration.fn.asSeconds=function(){return this.as("s")},tb.duration.fn.asMinutes=function(){return this.as("m")},tb.duration.fn.asHours=function(){return this.as("h")},tb.duration.fn.asDays=function(){return this.as("d")},tb.duration.fn.asWeeks=function(){return this.as("weeks")},tb.duration.fn.asMonths=function(){return this.as("M")},tb.duration.fn.asYears=function(){return this.as("y")},tb.locale("en",{ordinal:function(a){var b=a%10,c=1===A(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";
return a+c}}),Jb?module.exports=tb:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(xb.moment=ub),tb}),sb(!0)):sb()}).call(this);
(function(d,g){var r="&laquo;";var a="&raquo;";var l=d(window);function o(){return new Date(Date.UTC.apply(Date,arguments))}function c(){var s=new Date();return o(s.getFullYear(),s.getMonth(),s.getDate())}function m(s){return function(){return this[s].apply(this,arguments)}}var n=(function(){var s={get:function(t){return this.slice(t)[0]},contains:function(w){var v=w&&w.valueOf();for(var u=0,t=this.length;u<t;u++){if(this[u].valueOf()===v){return u}}return -1},remove:function(t){this.splice(t,1)},replace:function(t){if(!t){return}if(!d.isArray(t)){t=[t]}this.clear();this.push.apply(this,t)},clear:function(){this.length=0},copy:function(){var t=new n();t.replace(this);return t}};return function(){var t=[];t.push.apply(t,arguments);d.extend(t,s);return t}})();var q=function(t,s){this.dates=new n();this.viewDate=c();this.focusDate=null;this._process_options(s);this.element=d(t);this.isInline=false;this.isInput=this.element.is("input");this.component=this.element.is(".date")?this.element.find(".add-on, .input-group-addon, .btn"):false;this.hasInput=this.component&&this.element.find("input").length;if(this.component&&this.component.length===0){this.component=false}this.picker=d(h.template);this._buildEvents();this._attachEvents();if(this.isInline){this.picker.addClass("datepicker-inline").appendTo(this.element)}else{this.picker.addClass("datepicker-dropdown dropdown-menu")}if(this.o.rtl){this.picker.addClass("datepicker-rtl")}this.viewMode=this.o.startView;if(this.o.calendarWeeks){this.picker.find("tfoot th.today").attr("colspan",function(u,v){return parseInt(v)+1})}this._allow_update=false;this.setStartDate(this._o.startDate);this.setEndDate(this._o.endDate);this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);this.fillDow();this.fillMonths();this._allow_update=true;this.update();this.showMode();if(this.isInline){this.show()}};q.prototype={constructor:q,_process_options:function(s){this._o=d.extend({},this._o,s);var w=this.o=d.extend({},this._o);var v=w.language;if(!f[v]){v=v.split("-")[0];if(!f[v]){v=i.language}}w.language=v;switch(w.startView){case 2:case"decade":w.startView=2;break;case 1:case"year":w.startView=1;break;default:w.startView=0}switch(w.minViewMode){case 1:case"months":w.minViewMode=1;break;case 2:case"years":w.minViewMode=2;break;default:w.minViewMode=0}w.startView=Math.max(w.startView,w.minViewMode);if(w.multidate!==true){w.multidate=Number(w.multidate)||false;if(w.multidate!==false){w.multidate=Math.max(0,w.multidate)}else{w.multidate=1}}w.multidateSeparator=String(w.multidateSeparator);w.weekStart%=7;w.weekEnd=((w.weekStart+6)%7);var t=h.parseFormat(w.format);if(w.startDate!==-Infinity){if(!!w.startDate){if(w.startDate instanceof Date){w.startDate=this._local_to_utc(this._zero_time(w.startDate))}else{w.startDate=h.parseDate(w.startDate,t,w.language)}}else{w.startDate=-Infinity}}if(w.endDate!==Infinity){if(!!w.endDate){if(w.endDate instanceof Date){w.endDate=this._local_to_utc(this._zero_time(w.endDate))}else{w.endDate=h.parseDate(w.endDate,t,w.language)}}else{w.endDate=Infinity}}w.daysOfWeekDisabled=w.daysOfWeekDisabled||[];if(!d.isArray(w.daysOfWeekDisabled)){w.daysOfWeekDisabled=w.daysOfWeekDisabled.split(/[,\s]*/)}w.daysOfWeekDisabled=d.map(w.daysOfWeekDisabled,function(y){return parseInt(y,10)});var u=String(w.orientation).toLowerCase().split(/\s+/g),x=w.orientation.toLowerCase();u=d.grep(u,function(y){return(/^auto|left|right|top|bottom$/).test(y)});w.orientation={x:"auto",y:"auto"};if(!x||x==="auto"){}else{if(u.length===1){switch(u[0]){case"top":case"bottom":w.orientation.y=u[0];break;case"left":case"right":w.orientation.x=u[0];break}}else{x=d.grep(u,function(y){return(/^left|right$/).test(y)});w.orientation.x=x[0]||"auto";x=d.grep(u,function(y){return(/^top|bottom$/).test(y)});w.orientation.y=x[0]||"auto"}}},_events:[],_secondaryEvents:[],_applyEvents:function(s){for(var t=0,v,u,w;t<s.length;t++){v=s[t][0];if(s[t].length===2){u=g;w=s[t][1]}else{if(s[t].length===3){u=s[t][1];w=s[t][2]}}v.on(w,u)}},_unapplyEvents:function(s){for(var t=0,v,w,u;t<s.length;t++){v=s[t][0];if(s[t].length===2){u=g;w=s[t][1]}else{if(s[t].length===3){u=s[t][1];w=s[t][2]}}v.off(w,u)}},_buildEvents:function(){if(this.isInput){this._events=[[this.element,{focus:d.proxy(this.show,this),keyup:d.proxy(function(s){if(d.inArray(s.keyCode,[27,37,39,38,40,32,13,9])===-1){this.update()}},this),keydown:d.proxy(this.keydown,this)}]]}else{if(this.component&&this.hasInput){this._events=[[this.element.find("input"),{focus:d.proxy(this.show,this),keyup:d.proxy(function(s){if(d.inArray(s.keyCode,[27,37,39,38,40,32,13,9])===-1){this.update()}},this),keydown:d.proxy(this.keydown,this)}],[this.component,{click:d.proxy(this.show,this)}]]}else{if(this.element.is("div")){this.isInline=true}else{this._events=[[this.element,{click:d.proxy(this.show,this)}]]}}}this._events.push([this.element,"*",{blur:d.proxy(function(s){this._focused_from=s.target},this)}],[this.element,{blur:d.proxy(function(s){this._focused_from=s.target},this)}]);this._secondaryEvents=[[this.picker,{click:d.proxy(this.click,this)}],[d(window),{resize:d.proxy(this.place,this)}],[d(document),{"mousedown touchstart":d.proxy(function(s){if(!(this.element.is(s.target)||this.element.find(s.target).length||this.picker.is(s.target)||this.picker.find(s.target).length)){this.hide()}},this)}]]},_attachEvents:function(){this._detachEvents();this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents();this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(u,v){var t=v||this.dates.get(-1),s=this._utc_to_local(t);this.element.trigger({type:u,date:s,dates:d.map(this.dates,this._utc_to_local),format:d.proxy(function(w,y){if(arguments.length===0){w=this.dates.length-1;y=this.o.format}else{if(typeof w==="string"){y=w;w=this.dates.length-1}}y=y||this.o.format;var x=this.dates.get(w);return h.formatDate(x,y,this.o.language)},this)})},show:function(){if(!this.isInline){this.picker.appendTo("body")}this.picker.show();this.place();this._attachSecondaryEvents();this._trigger("show")},hide:function(){if(this.isInline){return}if(!this.picker.is(":visible")){return}this.focusDate=null;this.picker.hide().detach();this._detachSecondaryEvents();this.viewMode=this.o.startView;this.showMode();if(this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())){this.setValue()}this._trigger("hide")},remove:function(){this.hide();this._detachEvents();this._detachSecondaryEvents();this.picker.remove();delete this.element.data().datepicker;if(!this.isInput){delete this.element.data().date}},_utc_to_local:function(s){return s&&new Date(s.getTime()+(s.getTimezoneOffset()*60000))},_local_to_utc:function(s){return s&&new Date(s.getTime()-(s.getTimezoneOffset()*60000))},_zero_time:function(s){return s&&new Date(s.getFullYear(),s.getMonth(),s.getDate())},_zero_utc_time:function(s){return s&&new Date(Date.UTC(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate()))},getDates:function(){return d.map(this.dates,this._utc_to_local)},getUTCDates:function(){return d.map(this.dates,function(s){return new Date(s)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return new Date(this.dates.get(-1))},setDates:function(){var s=d.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,s);this._trigger("changeDate");this.setValue()},setUTCDates:function(){var s=d.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,d.map(s,this._utc_to_local));this._trigger("changeDate");this.setValue()},setDate:m("setDates"),setUTCDate:m("setUTCDates"),setValue:function(){var s=this.getFormattedDate();if(!this.isInput){if(this.component){this.element.find("input").val(s).change()}}else{this.element.val(s).change()}},getFormattedDate:function(s){if(s===g){s=this.o.format}var t=this.o.language;return d.map(this.dates,function(u){return h.formatDate(u,s,t)}).join(this.o.multidateSeparator)},setStartDate:function(s){this._process_options({startDate:s});this.update();this.updateNavArrows()},setEndDate:function(s){this._process_options({endDate:s});this.update();this.updateNavArrows()},setDaysOfWeekDisabled:function(s){this._process_options({daysOfWeekDisabled:s});this.update();this.updateNavArrows()},place:function(){if(this.isInline){return}var G=this.picker.outerWidth(),C=this.picker.outerHeight(),w=10,y=l.width(),t=l.height(),x=l.scrollTop();var E=parseInt(this.element.parents().filter(function(){return d(this).css("z-index")!=="auto"}).first().css("z-index"))+10;var B=this.component?this.component.parent().offset():this.element.offset();var F=this.component?this.component.outerHeight(true):this.element.outerHeight(false);var v=this.component?this.component.outerWidth(true):this.element.outerWidth(false);var A=B.left,D=B.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left");if(this.o.orientation.x!=="auto"){this.picker.addClass("datepicker-orient-"+this.o.orientation.x);if(this.o.orientation.x==="right"){A-=G-v}}else{this.picker.addClass("datepicker-orient-left");if(B.left<0){A-=B.left-w}else{if(B.left+G>y){A=y-G-w}}}var s=this.o.orientation.y,u,z;if(s==="auto"){u=-x+B.top-C;z=x+t-(B.top+F+C);if(Math.max(u,z)===z){s="top"}else{s="bottom"}}this.picker.addClass("datepicker-orient-"+s);if(s==="top"){D+=F}else{D-=C+parseInt(this.picker.css("padding-top"))}this.picker.css({top:D,left:A,zIndex:E})},_allow_update:true,update:function(){if(!this._allow_update){return}var t=this.dates.copy(),u=[],s=false;if(arguments.length){d.each(arguments,d.proxy(function(w,v){if(v instanceof Date){v=this._local_to_utc(v)}u.push(v)},this));s=true}else{u=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val();if(u&&this.o.multidate){u=u.split(this.o.multidateSeparator)}else{u=[u]}delete this.element.data().date}u=d.map(u,d.proxy(function(v){return h.parseDate(v,this.o.format,this.o.language)},this));u=d.grep(u,d.proxy(function(v){return(v<this.o.startDate||v>this.o.endDate||!v)},this),true);this.dates.replace(u);if(this.dates.length){this.viewDate=new Date(this.dates.get(-1))}else{if(this.viewDate<this.o.startDate){this.viewDate=new Date(this.o.startDate)}else{if(this.viewDate>this.o.endDate){this.viewDate=new Date(this.o.endDate)}}}if(s){this.setValue()}else{if(u.length){if(String(t)!==String(this.dates)){this._trigger("changeDate")}}}if(!this.dates.length&&t.length){this._trigger("clearDate")}this.fill()},fillDow:function(){var t=this.o.weekStart,u="<tr>";if(this.o.calendarWeeks){var s='<th class="cw">&nbsp;</th>';u+=s;this.picker.find(".datepicker-days thead tr:first-child").prepend(s)}while(t<this.o.weekStart+7){u+='<th class="dow">'+f[this.o.language].daysMin[(t++)%7]+"</th>"}u+="</tr>";this.picker.find(".datepicker-days thead").append(u)},fillMonths:function(){var t="",s=0;while(s<12){t+='<span class="month">'+f[this.o.language].monthsShort[s++]+"</span>"}this.picker.find(".datepicker-months td").html(t)},setRange:function(s){if(!s||!s.length){delete this.range}else{this.range=d.map(s,function(t){return t.valueOf()})}this.fill()},getClassNames:function(u){var s=[],v=this.viewDate.getUTCFullYear(),w=this.viewDate.getUTCMonth(),t=new Date();if(u.getUTCFullYear()<v||(u.getUTCFullYear()===v&&u.getUTCMonth()<w)){s.push("old")}else{if(u.getUTCFullYear()>v||(u.getUTCFullYear()===v&&u.getUTCMonth()>w)){s.push("new")}}if(this.focusDate&&u.valueOf()===this.focusDate.valueOf()){s.push("focused")}if(this.o.todayHighlight&&u.getUTCFullYear()===t.getFullYear()&&u.getUTCMonth()===t.getMonth()&&u.getUTCDate()===t.getDate()){s.push("today")}if(this.dates.contains(u)!==-1){s.push("active")}if(u.valueOf()<this.o.startDate||u.valueOf()>this.o.endDate||d.inArray(u.getUTCDay(),this.o.daysOfWeekDisabled)!==-1){s.push("disabled")}if(this.range){if(u>this.range[0]&&u<this.range[this.range.length-1]){s.push("range")}if(d.inArray(u.valueOf(),this.range)!==-1){s.push("selected")}}return s},fill:function(){var N=new Date(this.viewDate),C=N.getUTCFullYear(),O=N.getUTCMonth(),H=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,L=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,z=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,I=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,A=f[this.o.language].today||f.en.today||"",u=f[this.o.language].clear||f.en.clear||"",w;this.picker.find(".datepicker-days thead th.datepicker-switch").text(f[this.o.language].months[O]+" "+C);this.picker.find("tfoot th.today").text(A).toggle(this.o.todayBtn!==false);this.picker.find("tfoot th.clear").text(u).toggle(this.o.clearBtn!==false);this.updateNavArrows();this.fillMonths();var Q=o(C,O-1,28),K=h.getDaysInMonth(Q.getUTCFullYear(),Q.getUTCMonth());Q.setUTCDate(K);Q.setUTCDate(K-(Q.getUTCDay()-this.o.weekStart+7)%7);var s=new Date(Q);s.setUTCDate(s.getUTCDate()+42);s=s.valueOf();var B=[];var F;while(Q.valueOf()<s){if(Q.getUTCDay()===this.o.weekStart){B.push("<tr>");if(this.o.calendarWeeks){var t=new Date(+Q+(this.o.weekStart-Q.getUTCDay()-7)%7*86400000),x=new Date(Number(t)+(7+4-t.getUTCDay())%7*86400000),v=new Date(Number(v=o(x.getUTCFullYear(),0,1))+(7+4-v.getUTCDay())%7*86400000),D=(x-v)/86400000/7+1;B.push('<td class="cw">'+D+"</td>")}}F=this.getClassNames(Q);F.push("day");if(this.o.beforeShowDay!==d.noop){var E=this.o.beforeShowDay(this._utc_to_local(Q));if(E===g){E={}}else{if(typeof(E)==="boolean"){E={enabled:E}}else{if(typeof(E)==="string"){E={classes:E}}}}if(E.enabled===false){F.push("disabled")}if(E.classes){F=F.concat(E.classes.split(/\s+/))}if(E.tooltip){w=E.tooltip}}F=d.unique(F);B.push('<td class="'+F.join(" ")+'"'+(w?' title="'+w+'"':"")+">"+Q.getUTCDate()+"</td>");if(Q.getUTCDay()===this.o.weekEnd){B.push("</tr>")}Q.setUTCDate(Q.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(B.join(""));var y=this.picker.find(".datepicker-months").find("th:eq(1)").text(C).end().find("span").removeClass("active");d.each(this.dates,function(R,S){if(S.getUTCFullYear()===C){y.eq(S.getUTCMonth()).addClass("active")}});if(C<H||C>z){y.addClass("disabled")}if(C===H){y.slice(0,L).addClass("disabled")}if(C===z){y.slice(I+1).addClass("disabled")}B="";C=parseInt(C/10,10)*10;var P=this.picker.find(".datepicker-years").find("th:eq(1)").text(C+"-"+(C+9)).end().find("td");C-=1;var G=d.map(this.dates,function(R){return R.getUTCFullYear()}),M;for(var J=-1;J<11;J++){M=["year"];if(J===-1){M.push("old")}else{if(J===10){M.push("new")}}if(d.inArray(C,G)!==-1){M.push("active")}if(C<H||C>z){M.push("disabled")}B+='<span class="'+M.join(" ")+'">'+C+"</span>";C+=1}P.html(B)},updateNavArrows:function(){if(!this._allow_update){return}var u=new Date(this.viewDate),s=u.getUTCFullYear(),t=u.getUTCMonth();switch(this.viewMode){case 0:if(this.o.startDate!==-Infinity&&s<=this.o.startDate.getUTCFullYear()&&t<=this.o.startDate.getUTCMonth()){this.picker.find(".prev").css({visibility:"hidden"})}else{this.picker.find(".prev").css({visibility:"visible"})}if(this.o.endDate!==Infinity&&s>=this.o.endDate.getUTCFullYear()&&t>=this.o.endDate.getUTCMonth()){this.picker.find(".next").css({visibility:"hidden"})}else{this.picker.find(".next").css({visibility:"visible"})}break;case 1:case 2:if(this.o.startDate!==-Infinity&&s<=this.o.startDate.getUTCFullYear()){this.picker.find(".prev").css({visibility:"hidden"})}else{this.picker.find(".prev").css({visibility:"visible"})}if(this.o.endDate!==Infinity&&s>=this.o.endDate.getUTCFullYear()){this.picker.find(".next").css({visibility:"hidden"})}else{this.picker.find(".next").css({visibility:"visible"})}break}},click:function(w){w.preventDefault();var x=d(w.target).closest("span, td, th"),z,y,A;if(x.length===1){switch(x[0].nodeName.toLowerCase()){case"th":switch(x[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var s=h.modes[this.viewMode].navStep*(x[0].className==="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,s);this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,s);if(this.viewMode===1){this._trigger("changeYear",this.viewDate)}break}this.fill();break;case"today":var t=new Date();t=o(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0);this.showMode(-2);var u=this.o.todayBtn==="linked"?null:"view";this._setDate(t,u);break;case"clear":var v;if(this.isInput){v=this.element}else{if(this.component){v=this.element.find("input")}}if(v){v.val("").change()}this.update();this._trigger("changeDate");if(this.o.autoclose){this.hide()}break}break;case"span":if(!x.is(".disabled")){this.viewDate.setUTCDate(1);if(x.is(".month")){A=1;y=x.parent().find("span").index(x);z=this.viewDate.getUTCFullYear();this.viewDate.setUTCMonth(y);this._trigger("changeMonth",this.viewDate);if(this.o.minViewMode===1){this._setDate(o(z,y,A))}}else{A=1;y=0;z=parseInt(x.text(),10)||0;this.viewDate.setUTCFullYear(z);this._trigger("changeYear",this.viewDate);if(this.o.minViewMode===2){this._setDate(o(z,y,A))}}this.showMode(-1);this.fill()}break;case"td":if(x.is(".day")&&!x.is(".disabled")){A=parseInt(x.text(),10)||1;z=this.viewDate.getUTCFullYear();y=this.viewDate.getUTCMonth();if(x.is(".old")){if(y===0){y=11;z-=1}else{y-=1}}else{if(x.is(".new")){if(y===11){y=0;z+=1}else{y+=1}}}this._setDate(o(z,y,A))}break}}if(this.picker.is(":visible")&&this._focused_from){d(this._focused_from).focus()}delete this._focused_from},_toggle_multidate:function(t){var s=this.dates.contains(t);if(!t){this.dates.clear()}else{if(s!==-1){this.dates.remove(s)}else{this.dates.push(t)}}if(typeof this.o.multidate==="number"){while(this.dates.length>this.o.multidate){this.dates.remove(0)}}},_setDate:function(s,u){if(!u||u==="date"){this._toggle_multidate(s&&new Date(s))}if(!u||u==="view"){this.viewDate=s&&new Date(s)}this.fill();this.setValue();this._trigger("changeDate");var t;if(this.isInput){t=this.element}else{if(this.component){t=this.element.find("input")}}if(t){t.change()}if(this.o.autoclose&&(!u||u==="date")){this.hide()}},moveMonth:function(s,t){if(!s){return g}if(!t){return s}var w=new Date(s.valueOf()),A=w.getUTCDate(),x=w.getUTCMonth(),v=Math.abs(t),z,y;t=t>0?1:-1;if(v===1){y=t===-1?function(){return w.getUTCMonth()===x}:function(){return w.getUTCMonth()!==z};z=x+t;w.setUTCMonth(z);if(z<0||z>11){z=(z+12)%12}}else{for(var u=0;u<v;u++){w=this.moveMonth(w,t)}z=w.getUTCMonth();w.setUTCDate(A);y=function(){return z!==w.getUTCMonth()}}while(y()){w.setUTCDate(--A);w.setUTCMonth(z)}return w},moveYear:function(t,s){return this.moveMonth(t,s*12)},dateWithinRange:function(s){return s>=this.o.startDate&&s<=this.o.endDate},keydown:function(y){if(this.picker.is(":not(:visible)")){if(y.keyCode===27){this.show()}return}var u=false,t,s,w,x=this.focusDate||this.viewDate;switch(y.keyCode){case 27:if(this.focusDate){this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill()}else{this.hide()}y.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation){break}t=y.keyCode===37?-1:1;if(y.ctrlKey){s=this.moveYear(this.dates.get(-1)||c(),t);w=this.moveYear(x,t);this._trigger("changeYear",this.viewDate)}else{if(y.shiftKey){s=this.moveMonth(this.dates.get(-1)||c(),t);w=this.moveMonth(x,t);this._trigger("changeMonth",this.viewDate)}else{s=new Date(this.dates.get(-1)||c());s.setUTCDate(s.getUTCDate()+t);w=new Date(x);w.setUTCDate(x.getUTCDate()+t)}}if(this.dateWithinRange(s)){this.focusDate=this.viewDate=w;this.setValue();this.fill();y.preventDefault()}break;case 38:case 40:if(!this.o.keyboardNavigation){break}t=y.keyCode===38?-1:1;if(y.ctrlKey){s=this.moveYear(this.dates.get(-1)||c(),t);w=this.moveYear(x,t);this._trigger("changeYear",this.viewDate)}else{if(y.shiftKey){s=this.moveMonth(this.dates.get(-1)||c(),t);w=this.moveMonth(x,t);this._trigger("changeMonth",this.viewDate)}else{s=new Date(this.dates.get(-1)||c());s.setUTCDate(s.getUTCDate()+t*7);w=new Date(x);w.setUTCDate(x.getUTCDate()+t*7)}}if(this.dateWithinRange(s)){this.focusDate=this.viewDate=w;this.setValue();this.fill();y.preventDefault()}break;case 32:break;case 13:x=this.focusDate||this.dates.get(-1)||this.viewDate;this._toggle_multidate(x);u=true;this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.setValue();this.fill();if(this.picker.is(":visible")){y.preventDefault();if(this.o.autoclose){this.hide()}}break;case 9:this.focusDate=null;this.viewDate=this.dates.get(-1)||this.viewDate;this.fill();this.hide();break}if(u){if(this.dates.length){this._trigger("changeDate")}else{this._trigger("clearDate")}var v;if(this.isInput){v=this.element}else{if(this.component){v=this.element.find("input")}}if(v){v.change()}}},showMode:function(s){if(s){this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+s))}this.picker.find(">div").hide().filter(".datepicker-"+h.modes[this.viewMode].clsName).css("display","block");this.updateNavArrows()}};var j=function(t,s){this.element=d(t);this.inputs=d.map(s.inputs,function(u){return u.jquery?u[0]:u});delete s.inputs;d(this.inputs).datepicker(s).bind("changeDate",d.proxy(this.dateUpdated,this));this.pickers=d.map(this.inputs,function(u){return d(u).data("datepicker")});this.updateDates()};j.prototype={updateDates:function(){this.dates=d.map(this.pickers,function(s){return s.getUTCDate()});this.updateRanges()},updateRanges:function(){var s=d.map(this.dates,function(t){return t.valueOf()});d.each(this.pickers,function(t,u){u.setRange(s)})},dateUpdated:function(v){if(this.updating){return}this.updating=true;var w=d(v.target).data("datepicker"),u=w.getUTCDate(),t=d.inArray(v.target,this.inputs),s=this.inputs.length;if(t===-1){return}d.each(this.pickers,function(x,y){if(!y.getUTCDate()){y.setUTCDate(u)}});if(u<this.dates[t]){while(t>=0&&u<this.dates[t]){this.pickers[t--].setUTCDate(u)}}else{if(u>this.dates[t]){while(t<s&&u>this.dates[t]){this.pickers[t++].setUTCDate(u)}}}this.updateDates();delete this.updating},remove:function(){d.map(this.pickers,function(s){s.remove()});delete this.element.data().datepicker}};function k(v,y){var x=d(v).data(),s={},w,u=new RegExp("^"+y.toLowerCase()+"([A-Z])");y=new RegExp("^"+y.toLowerCase());function z(B,A){return A.toLowerCase()}for(var t in x){if(y.test(t)){w=t.replace(u,z);s[w]=x[t]}}return s}function p(u){var s={};if(!f[u]){u=u.split("-")[0];if(!f[u]){return}}var t=f[u];d.each(e,function(w,v){if(v in t){s[v]=t[v]}});return s}var b=d.fn.datepicker;d.fn.datepicker=function(u){var s=Array.apply(null,arguments);s.shift();var t;this.each(function(){var C=d(this),A=C.data("datepicker"),w=typeof u==="object"&&u;if(!A){var y=k(this,"date"),v=d.extend({},i,y,w),x=p(v.language),z=d.extend({},i,x,y,w);if(C.is(".input-daterange")||z.inputs){var B={inputs:z.inputs||C.find("input").toArray()};C.data("datepicker",(A=new j(this,d.extend(z,B))))}else{C.data("datepicker",(A=new q(this,z)))}}if(typeof u==="string"&&typeof A[u]==="function"){t=A[u].apply(A,s);if(t!==g){return false}}});if(t!==g){return t}else{return this}};var i=d.fn.datepicker.defaults={autoclose:false,beforeShowDay:d.noop,calendarWeeks:false,clearBtn:false,daysOfWeekDisabled:[],endDate:Infinity,forceParse:true,format:"mm/dd/yyyy",keyboardNavigation:true,language:"en",minViewMode:0,multidate:false,multidateSeparator:",",orientation:"auto",rtl:false,startDate:-Infinity,startView:0,todayBtn:false,todayHighlight:false,weekStart:0};var e=d.fn.datepicker.locale_opts=["format","rtl","weekStart"];d.fn.datepicker.Constructor=q;var f=d.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}};var h={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(s){return(((s%4===0)&&(s%100!==0))||(s%400===0))},getDaysInMonth:function(s,t){return[31,(h.isLeapYear(s)?29:28),31,30,31,30,31,31,30,31,30,31][t]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(u){var s=u.replace(this.validParts,"\0").split("\0"),t=u.match(this.validParts);if(!s||!s.length||!t||t.length===0){throw new Error("Invalid date format.")}return{separators:s,parts:t}},parseDate:function(J,G,D){if(!J){return g}if(J instanceof Date){return J}if(typeof G==="string"){G=h.parseFormat(G)}var v=/([\-+]\d+)([dmwy])/,B=J.match(/([\-+]\d+)([dmwy])/g),C,A,F;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(J)){J=new Date();for(F=0;F<B.length;F++){C=v.exec(B[F]);A=parseInt(C[1]);switch(C[2]){case"d":J.setUTCDate(J.getUTCDate()+A);break;case"m":J=q.prototype.moveMonth.call(q.prototype,J,A);break;case"w":J.setUTCDate(J.getUTCDate()+A*7);break;case"y":J=q.prototype.moveYear.call(q.prototype,J,A);break}}return o(J.getUTCFullYear(),J.getUTCMonth(),J.getUTCDate(),0,0,0)}B=J&&J.match(this.nonpunctuation)||[];J=new Date();var w={},H=["yyyy","yy","M","MM","m","mm","d","dd"],z={yyyy:function(L,s){return L.setUTCFullYear(s)},yy:function(L,s){return L.setUTCFullYear(2000+s)},m:function(L,s){if(isNaN(L)){return L}s-=1;while(s<0){s+=12}s%=12;L.setUTCMonth(s);while(L.getUTCMonth()!==s){L.setUTCDate(L.getUTCDate()-1)}return L},d:function(L,s){return L.setUTCDate(s)}},K,u;z.M=z.MM=z.mm=z.m;z.dd=z.d;J=o(J.getFullYear(),J.getMonth(),J.getDate(),0,0,0);var t=G.parts.slice();if(B.length!==t.length){t=d(t).filter(function(s,L){return d.inArray(L,H)!==-1}).toArray()}function I(){var s=this.slice(0,B[F].length),L=B[F].slice(0,s.length);return s===L}if(B.length===t.length){var E;for(F=0,E=t.length;F<E;F++){K=parseInt(B[F],10);C=t[F];if(isNaN(K)){switch(C){case"MM":u=d(f[D].months).filter(I);K=d.inArray(u[0],f[D].months)+1;break;case"M":u=d(f[D].monthsShort).filter(I);K=d.inArray(u[0],f[D].monthsShort)+1;break}}w[C]=K}var x,y;for(F=0;F<H.length;F++){y=H[F];if(y in w&&!isNaN(w[y])){x=new Date(J);z[y](x,w[y]);if(!isNaN(x)){J=x}}}}return J},formatDate:function(s,w,y){if(!s){return""}if(typeof w==="string"){w=h.parseFormat(w)}var x={d:s.getUTCDate(),D:f[y].daysShort[s.getUTCDay()],DD:f[y].days[s.getUTCDay()],m:s.getUTCMonth()+1,M:f[y].monthsShort[s.getUTCMonth()],MM:f[y].months[s.getUTCMonth()],yy:s.getUTCFullYear().toString().substring(2),yyyy:s.getUTCFullYear()};x.dd=(x.d<10?"0":"")+x.d;x.mm=(x.m<10?"0":"")+x.m;s=[];var v=d.extend([],w.separators);for(var u=0,t=w.parts.length;u<=t;u++){if(v.length){s.push(v.shift())}s.push(x[w.parts[u]])}return s.join("")},headTemplate:'<thead><tr><th class="prev">'+r+'</th><th colspan="5" class="datepicker-switch"></th><th class="next">'+a+"</th></tr></thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};h.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+h.headTemplate+"<tbody></tbody>"+h.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+h.headTemplate+h.contTemplate+h.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+h.headTemplate+h.contTemplate+h.footTemplate+"</table></div></div>";d.fn.datepicker.DPGlobal=h;d.fn.datepicker.noConflict=function(){d.fn.datepicker=b;return this};d(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(t){var s=d(this);if(s.data("datepicker")){return}t.preventDefault();s.datepicker("show")});d(function(){d('[data-provide="datepicker-inline"]').datepicker()})}(window.jQuery));
/*
//! version : 3.1.3
=========================================================
bootstrap-datetimepicker.js
https://github.com/Eonasdan/bootstrap-datetimepicker
=========================================================
The MIT License (MIT)

Copyright (c) 2014 Jonathan Peterson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
;(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'moment'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('moment'));
    }
    else {
        // Neither AMD or CommonJS used. Use global variables.
        if (!jQuery) {
            throw new Error('bootstrap-datetimepicker requires jQuery to be loaded first');
        }
        if (!moment) {
            throw new Error('bootstrap-datetimepicker requires moment.js to be loaded first');
        }
        factory(root.jQuery, moment);
    }
}(this, function ($, moment) {
    'use strict';
    if (typeof moment === 'undefined') {
        throw new Error('momentjs is required');
    }

    var dpgId = 0,

    DateTimePicker = function (element, options) {
        var defaults = $.fn.datetimepicker.defaults,

            icons = {
                time: 'glyphicon glyphicon-time',
                date: 'glyphicon glyphicon-calendar',
                up: 'glyphicon glyphicon-chevron-up',
                down: 'glyphicon glyphicon-chevron-down'
            },

            picker = this,
            errored = false,
            dDate,

        init = function () {
            var icon = false, localeData, rInterval;
            picker.options = $.extend({}, defaults, options);
            picker.options.icons = $.extend({}, icons, picker.options.icons);

            picker.element = $(element);

            dataToOptions();

            if (!(picker.options.pickTime || picker.options.pickDate)) {
                throw new Error('Must choose at least one picker');
            }

            picker.id = dpgId++;
            moment.locale(picker.options.language);
            picker.date = moment();
            picker.unset = false;
            picker.isInput = picker.element.is('input');
            picker.component = false;

            if (picker.element.hasClass('input-group')) {
                if (picker.element.find('.datepickerbutton').size() === 0) {//in case there is more then one 'input-group-addon' Issue #48
                    picker.component = picker.element.find('[class^="input-group-"]');
                }
                else {
                    picker.component = picker.element.find('.datepickerbutton');
                }
            }
            picker.format = picker.options.format;

            localeData = moment().localeData();

            if (!picker.format) {
                picker.format = (picker.options.pickDate ? localeData.longDateFormat('L') : '');
                if (picker.options.pickDate && picker.options.pickTime) {
                    picker.format += ' ';
                }
                picker.format += (picker.options.pickTime ? localeData.longDateFormat('LT') : '');
                if (picker.options.useSeconds) {
                    if (localeData.longDateFormat('LT').indexOf(' A') !== -1) {
                        picker.format = picker.format.split(' A')[0] + ':ss A';
                    }
                    else {
                        picker.format += ':ss';
                    }
                }
            }
            picker.use24hours = (picker.format.toLowerCase().indexOf('a') < 0 && picker.format.indexOf('h') < 0);

            if (picker.component) {
                icon = picker.component.find('span');
            }

            if (picker.options.pickTime) {
                if (icon) {
                    icon.addClass(picker.options.icons.time);
                }
            }
            if (picker.options.pickDate) {
                if (icon) {
                    icon.removeClass(picker.options.icons.time);
                    icon.addClass(picker.options.icons.date);
                }
            }

            picker.options.widgetParent =
                typeof picker.options.widgetParent === 'string' && picker.options.widgetParent ||
                picker.element.parents().filter(function () {
                    return 'scroll' === $(this).css('overflow-y');
                }).get(0) ||
                'body';

            picker.widget = $(getTemplate()).appendTo(picker.options.widgetParent);

            picker.minViewMode = picker.options.minViewMode || 0;
            if (typeof picker.minViewMode === 'string') {
                switch (picker.minViewMode) {
                    case 'months':
                        picker.minViewMode = 1;
                        break;
                    case 'years':
                        picker.minViewMode = 2;
                        break;
                    default:
                        picker.minViewMode = 0;
                        break;
                }
            }
            picker.viewMode = picker.options.viewMode || 0;
            if (typeof picker.viewMode === 'string') {
                switch (picker.viewMode) {
                    case 'months':
                        picker.viewMode = 1;
                        break;
                    case 'years':
                        picker.viewMode = 2;
                        break;
                    default:
                        picker.viewMode = 0;
                        break;
                }
            }

            picker.viewMode = Math.max(picker.viewMode, picker.minViewMode);

            picker.options.disabledDates = indexGivenDates(picker.options.disabledDates);
            picker.options.enabledDates = indexGivenDates(picker.options.enabledDates);

            picker.startViewMode = picker.viewMode;
            picker.setMinDate(picker.options.minDate);
            picker.setMaxDate(picker.options.maxDate);
            fillDow();
            fillMonths();
            fillHours();
            fillMinutes();
            fillSeconds();
            update();
            showMode();
            if (!getPickerInput().prop('disabled')) {
                attachDatePickerEvents();
            }
            if (picker.options.defaultDate !== '' && getPickerInput().val() === '') {
                picker.setValue(picker.options.defaultDate);
            }
            if (picker.options.minuteStepping !== 1) {
                rInterval = picker.options.minuteStepping;
                picker.date.minutes((Math.round(picker.date.minutes() / rInterval) * rInterval) % 60).seconds(0);
            }
        },

        getPickerInput = function () {
            var input;

            if (picker.isInput) {
                return picker.element;
            }
            input = picker.element.find('.datepickerinput');
            if (input.size() === 0) {
                input = picker.element.find('input');
            }
            else if (!input.is('input')) {
                throw new Error('CSS class "datepickerinput" cannot be applied to non input element');
            }
            return input;
        },

        dataToOptions = function () {
            var eData;
            if (picker.element.is('input')) {
                eData = picker.element.data();
            }
            else {
                eData = picker.element.find('input').data();
            }
            if (eData.dateFormat !== undefined) {
                picker.options.format = eData.dateFormat;
            }
            if (eData.datePickdate !== undefined) {
                picker.options.pickDate = eData.datePickdate;
            }
            if (eData.datePicktime !== undefined) {
                picker.options.pickTime = eData.datePicktime;
            }
            if (eData.dateUseminutes !== undefined) {
                picker.options.useMinutes = eData.dateUseminutes;
            }
            if (eData.dateUseseconds !== undefined) {
                picker.options.useSeconds = eData.dateUseseconds;
            }
            if (eData.dateUsecurrent !== undefined) {
                picker.options.useCurrent = eData.dateUsecurrent;
            }
            if (eData.calendarWeeks !== undefined) {
                picker.options.calendarWeeks = eData.calendarWeeks;
            }
            if (eData.dateMinutestepping !== undefined) {
                picker.options.minuteStepping = eData.dateMinutestepping;
            }
            if (eData.dateMindate !== undefined) {
                picker.options.minDate = eData.dateMindate;
            }
            if (eData.dateMaxdate !== undefined) {
                picker.options.maxDate = eData.dateMaxdate;
            }
            if (eData.dateShowtoday !== undefined) {
                picker.options.showToday = eData.dateShowtoday;
            }
            if (eData.dateCollapse !== undefined) {
                picker.options.collapse = eData.dateCollapse;
            }
            if (eData.dateLanguage !== undefined) {
                picker.options.language = eData.dateLanguage;
            }
            if (eData.dateDefaultdate !== undefined) {
                picker.options.defaultDate = eData.dateDefaultdate;
            }
            if (eData.dateDisableddates !== undefined) {
                picker.options.disabledDates = eData.dateDisableddates;
            }
            if (eData.dateEnableddates !== undefined) {
                picker.options.enabledDates = eData.dateEnableddates;
            }
            if (eData.dateIcons !== undefined) {
                picker.options.icons = eData.dateIcons;
            }
            if (eData.dateUsestrict !== undefined) {
                picker.options.useStrict = eData.dateUsestrict;
            }
            if (eData.dateDirection !== undefined) {
                picker.options.direction = eData.dateDirection;
            }
            if (eData.dateSidebyside !== undefined) {
                picker.options.sideBySide = eData.dateSidebyside;
            }
            if (eData.dateDaysofweekdisabled !== undefined) {
                picker.options.daysOfWeekDisabled = eData.dateDaysofweekdisabled;
            }
        },

        place = function () {
            var position = 'absolute',
                offset = picker.component ? picker.component.offset() : picker.element.offset(),
                $window = $(window),
                placePosition;

            picker.width = picker.component ? picker.component.outerWidth() : picker.element.outerWidth();
            offset.top = offset.top + picker.element.outerHeight();

            if (picker.options.direction === 'up') {
                placePosition = 'top';
            } else if (picker.options.direction === 'bottom') {
                placePosition = 'bottom';
            } else if (picker.options.direction === 'auto') {
                if (offset.top + picker.widget.height() > $window.height() + $window.scrollTop() && picker.widget.height() + picker.element.outerHeight() < offset.top) {
                    placePosition = 'top';
                } else {
                    placePosition = 'bottom';
                }
            }
            if (placePosition === 'top') {
                offset.bottom = $window.height() - offset.top + picker.element.outerHeight() + 3;
                picker.widget.addClass('top').removeClass('bottom');
            } else {
                offset.top += 1;
                picker.widget.addClass('bottom').removeClass('top');
            }

            if (picker.options.width !== undefined) {
                picker.widget.width(picker.options.width);
            }

            if (picker.options.orientation === 'left') {
                picker.widget.addClass('left-oriented');
                offset.left = offset.left - picker.widget.width() + 20;
            }

            if (isInFixed()) {
                position = 'fixed';
                offset.top -= $window.scrollTop();
                offset.left -= $window.scrollLeft();
            }

            if ($window.width() < offset.left + picker.widget.outerWidth()) {
                offset.right = $window.width() - offset.left - picker.width;
                offset.left = 'auto';
                picker.widget.addClass('pull-right');
            } else {
                offset.right = 'auto';
                picker.widget.removeClass('pull-right');
            }

            if (placePosition === 'top') {
                picker.widget.css({
                    position: position,
                    bottom: offset.bottom,
                    top: 'auto',
                    left: offset.left,
                    right: offset.right
                });
            } else {
                picker.widget.css({
                    position: position,
                    top: offset.top,
                    bottom: 'auto',
                    left: offset.left,
                    right: offset.right
                });
            }
        },

        notifyChange = function (oldDate, eventType) {
            if (moment(picker.date).isSame(moment(oldDate)) && !errored) {
                return;
            }
            errored = false;
            picker.element.trigger({
                type: 'dp.change',
                date: moment(picker.date),
                oldDate: moment(oldDate)
            });

            if (eventType !== 'change') {
                picker.element.change();
            }
        },

        notifyError = function (date) {
            errored = true;
            picker.element.trigger({
                type: 'dp.error',
                date: moment(date, picker.format, picker.options.useStrict)
            });
        },

        update = function (newDate) {
            moment.locale(picker.options.language);
            var dateStr = newDate;
            if (!dateStr) {
                dateStr = getPickerInput().val();
                if (dateStr) {
                    picker.date = moment(dateStr, picker.format, picker.options.useStrict);
                }
                if (!picker.date) {
                    picker.date = moment();
                }
            }
            picker.viewDate = moment(picker.date).startOf('month');
            fillDate();
            fillTime();
        },

        fillDow = function () {
            moment.locale(picker.options.language);
            var html = $('<tr>'), weekdaysMin = moment.weekdaysMin(), i;
            if (picker.options.calendarWeeks === true) {
                html.append('<th class="cw">#</th>');
            }
            if (moment().localeData()._week.dow === 0) { // starts on Sunday
                for (i = 0; i < 7; i++) {
                    html.append('<th class="dow">' + weekdaysMin[i] + '</th>');
                }
            } else {
                for (i = 1; i < 8; i++) {
                    if (i === 7) {
                        html.append('<th class="dow">' + weekdaysMin[0] + '</th>');
                    } else {
                        html.append('<th class="dow">' + weekdaysMin[i] + '</th>');
                    }
                }
            }
            picker.widget.find('.datepicker-days thead').append(html);
        },

        fillMonths = function () {
            moment.locale(picker.options.language);
            var html = '', i, monthsShort = moment.monthsShort();
            for (i = 0; i < 12; i++) {
                html += '<span class="month">' + monthsShort[i] + '</span>';
            }
            picker.widget.find('.datepicker-months td').append(html);
        },

        fillDate = function () {
            if (!picker.options.pickDate) {
                return;
            }
            moment.locale(picker.options.language);
            var year = picker.viewDate.year(),
                month = picker.viewDate.month(),
                startYear = picker.options.minDate.year(),
                startMonth = picker.options.minDate.month(),
                endYear = picker.options.maxDate.year(),
                endMonth = picker.options.maxDate.month(),
                currentDate,
                prevMonth, nextMonth, html = [], row, clsName, i, days, yearCont, currentYear, months = moment.months();

            picker.widget.find('.datepicker-days').find('.disabled').removeClass('disabled');
            picker.widget.find('.datepicker-months').find('.disabled').removeClass('disabled');
            picker.widget.find('.datepicker-years').find('.disabled').removeClass('disabled');

            picker.widget.find('.datepicker-days th:eq(1)').text(
                months[month] + ' ' + year);

            prevMonth = moment(picker.viewDate, picker.format, picker.options.useStrict).subtract(1, 'months');
            days = prevMonth.daysInMonth();
            prevMonth.date(days).startOf('week');
            if ((year === startYear && month <= startMonth) || year < startYear) {
                picker.widget.find('.datepicker-days th:eq(0)').addClass('disabled');
            }
            if ((year === endYear && month >= endMonth) || year > endYear) {
                picker.widget.find('.datepicker-days th:eq(2)').addClass('disabled');
            }

            nextMonth = moment(prevMonth).add(42, 'd');
            while (prevMonth.isBefore(nextMonth)) {
                if (prevMonth.weekday() === moment().startOf('week').weekday()) {
                    row = $('<tr>');
                    html.push(row);
                    if (picker.options.calendarWeeks === true) {
                        row.append('<td class="cw">' + prevMonth.week() + '</td>');
                    }
                }
                clsName = '';
                if (prevMonth.year() < year || (prevMonth.year() === year && prevMonth.month() < month)) {
                    clsName += ' old';
                } else if (prevMonth.year() > year || (prevMonth.year() === year && prevMonth.month() > month)) {
                    clsName += ' new';
                }
                if (prevMonth.isSame(moment({y: picker.date.year(), M: picker.date.month(), d: picker.date.date()}))) {
                    clsName += ' active';
                }
                if (isInDisableDates(prevMonth, 'day') || !isInEnableDates(prevMonth)) {
                    clsName += ' disabled';
                }
                if (picker.options.showToday === true) {
                    if (prevMonth.isSame(moment(), 'day')) {
                        clsName += ' today';
                    }
                }
                if (picker.options.daysOfWeekDisabled) {
                    for (i = 0; i < picker.options.daysOfWeekDisabled.length; i++) {
                        if (prevMonth.day() === picker.options.daysOfWeekDisabled[i]) {
                            clsName += ' disabled';
                            break;
                        }
                    }
                }
                row.append('<td class="day' + clsName + '">' + prevMonth.date() + '</td>');

                currentDate = prevMonth.date();
                prevMonth.add(1, 'd');

                if (currentDate === prevMonth.date()) {
                    prevMonth.add(1, 'd');
                }
            }
            picker.widget.find('.datepicker-days tbody').empty().append(html);
            currentYear = picker.date.year();
            months = picker.widget.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
            if (currentYear === year) {
                months.eq(picker.date.month()).addClass('active');
            }
            if (year - 1 < startYear) {
                picker.widget.find('.datepicker-months th:eq(0)').addClass('disabled');
            }
            if (year + 1 > endYear) {
                picker.widget.find('.datepicker-months th:eq(2)').addClass('disabled');
            }
            for (i = 0; i < 12; i++) {
                if ((year === startYear && startMonth > i) || (year < startYear)) {
                    $(months[i]).addClass('disabled');
                } else if ((year === endYear && endMonth < i) || (year > endYear)) {
                    $(months[i]).addClass('disabled');
                }
            }

            html = '';
            year = parseInt(year / 10, 10) * 10;
            yearCont = picker.widget.find('.datepicker-years').find(
                'th:eq(1)').text(year + '-' + (year + 9)).parents('table').find('td');
            picker.widget.find('.datepicker-years').find('th').removeClass('disabled');
            if (startYear > year) {
                picker.widget.find('.datepicker-years').find('th:eq(0)').addClass('disabled');
            }
            if (endYear < year + 9) {
                picker.widget.find('.datepicker-years').find('th:eq(2)').addClass('disabled');
            }
            year -= 1;
            for (i = -1; i < 11; i++) {
                html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + ((year < startYear || year > endYear) ? ' disabled' : '') + '">' + year + '</span>';
                year += 1;
            }
            yearCont.html(html);
        },

        fillHours = function () {
            moment.locale(picker.options.language);
            var table = picker.widget.find('.timepicker .timepicker-hours table'), html = '', current, i, j;
            table.parent().hide();
            if (picker.use24hours) {
                current = 0;
                for (i = 0; i < 6; i += 1) {
                    html += '<tr>';
                    for (j = 0; j < 4; j += 1) {
                        html += '<td class="hour">' + padLeft(current.toString()) + '</td>';
                        current++;
                    }
                    html += '</tr>';
                }
            }
            else {
                current = 1;
                for (i = 0; i < 3; i += 1) {
                    html += '<tr>';
                    for (j = 0; j < 4; j += 1) {
                        html += '<td class="hour">' + padLeft(current.toString()) + '</td>';
                        current++;
                    }
                    html += '</tr>';
                }
            }
            table.html(html);
        },

        fillMinutes = function () {
            var table = picker.widget.find('.timepicker .timepicker-minutes table'), html = '', current = 0, i, j, step = picker.options.minuteStepping;
            table.parent().hide();
            if (step === 1)  {
                step = 5;
            }
            for (i = 0; i < Math.ceil(60 / step / 4) ; i++) {
                html += '<tr>';
                for (j = 0; j < 4; j += 1) {
                    if (current < 60) {
                        html += '<td class="minute">' + padLeft(current.toString()) + '</td>';
                        current += step;
                    } else {
                        html += '<td></td>';
                    }
                }
                html += '</tr>';
            }
            table.html(html);
        },

        fillSeconds = function () {
            var table = picker.widget.find('.timepicker .timepicker-seconds table'), html = '', current = 0, i, j;
            table.parent().hide();
            for (i = 0; i < 3; i++) {
                html += '<tr>';
                for (j = 0; j < 4; j += 1) {
                    html += '<td class="second">' + padLeft(current.toString()) + '</td>';
                    current += 5;
                }
                html += '</tr>';
            }
            table.html(html);
        },

        fillTime = function () {
            if (!picker.date) {
                return;
            }
            var timeComponents = picker.widget.find('.timepicker span[data-time-component]'),
                hour = picker.date.hours(),
                period = picker.date.format('A');
            if (!picker.use24hours) {
                if (hour === 0) {
                    hour = 12;
                } else if (hour !== 12) {
                    hour = hour % 12;
                }
                picker.widget.find('.timepicker [data-action=togglePeriod]').text(period);
            }
            timeComponents.filter('[data-time-component=hours]').text(padLeft(hour));
            timeComponents.filter('[data-time-component=minutes]').text(padLeft(picker.date.minutes()));
            timeComponents.filter('[data-time-component=seconds]').text(padLeft(picker.date.second()));
        },

        click = function (e) {
            e.stopPropagation();
            e.preventDefault();
            picker.unset = false;
            var target = $(e.target).closest('span, td, th'), month, year, step, day, oldDate = moment(picker.date);
            if (target.length === 1) {
                if (!target.is('.disabled')) {
                    switch (target[0].nodeName.toLowerCase()) {
                        case 'th':
                            switch (target[0].className) {
                                case 'picker-switch':
                                    showMode(1);
                                    break;
                                case 'prev':
                                case 'next':
                                    step = dpGlobal.modes[picker.viewMode].navStep;
                                    if (target[0].className === 'prev') {
                                        step = step * -1;
                                    }
                                    picker.viewDate.add(step, dpGlobal.modes[picker.viewMode].navFnc);
                                    fillDate();
                                    break;
                            }
                            break;
                        case 'span':
                            if (target.is('.month')) {
                                month = target.parent().find('span').index(target);
                                picker.viewDate.month(month);
                            } else {
                                year = parseInt(target.text(), 10) || 0;
                                picker.viewDate.year(year);
                            }
                            if (picker.viewMode === picker.minViewMode) {
                                picker.date = moment({
                                    y: picker.viewDate.year(),
                                    M: picker.viewDate.month(),
                                    d: picker.viewDate.date(),
                                    h: picker.date.hours(),
                                    m: picker.date.minutes(),
                                    s: picker.date.seconds()
                                });
                                set();
                                notifyChange(oldDate, e.type);
                            }
                            showMode(-1);
                            fillDate();
                            break;
                        case 'td':
                            if (target.is('.day')) {
                                day = parseInt(target.text(), 10) || 1;
                                month = picker.viewDate.month();
                                year = picker.viewDate.year();
                                if (target.is('.old')) {
                                    if (month === 0) {
                                        month = 11;
                                        year -= 1;
                                    } else {
                                        month -= 1;
                                    }
                                } else if (target.is('.new')) {
                                    if (month === 11) {
                                        month = 0;
                                        year += 1;
                                    } else {
                                        month += 1;
                                    }
                                }
                                picker.date = moment({
                                    y: year,
                                    M: month,
                                    d: day,
                                    h: picker.date.hours(),
                                    m: picker.date.minutes(),
                                    s: picker.date.seconds()
                                }
                                );
                                picker.viewDate = moment({
                                    y: year, M: month, d: Math.min(28, day)
                                });
                                fillDate();
                                set();
                                notifyChange(oldDate, e.type);
                            }
                            break;
                    }
                }
            }
        },

        actions = {
            incrementHours: function () {
                checkDate('add', 'hours', 1);
            },

            incrementMinutes: function () {
                checkDate('add', 'minutes', picker.options.minuteStepping);
            },

            incrementSeconds: function () {
                checkDate('add', 'seconds', 1);
            },

            decrementHours: function () {
                checkDate('subtract', 'hours', 1);
            },

            decrementMinutes: function () {
                checkDate('subtract', 'minutes', picker.options.minuteStepping);
            },

            decrementSeconds: function () {
                checkDate('subtract', 'seconds', 1);
            },

            togglePeriod: function () {
                var hour = picker.date.hours();
                if (hour >= 12) {
                    hour -= 12;
                } else {
                    hour += 12;
                }
                picker.date.hours(hour);
            },

            showPicker: function () {
                picker.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                picker.widget.find('.timepicker .timepicker-picker').show();
            },

            showHours: function () {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-hours').show();
            },

            showMinutes: function () {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-minutes').show();
            },

            showSeconds: function () {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-seconds').show();
            },

            selectHour: function (e) {
                var hour = parseInt($(e.target).text(), 10);
                if (!picker.use24hours) {
                    if (picker.date.hours() >= 12) {
                        if (hour !== 12) {
                            hour += 12;
                        }
                    } else {
                        if (hour === 12) {
                            hour = 0;
                        }
                    }
                }
                picker.date.hours(hour);
                actions.showPicker.call(picker);
            },

            selectMinute: function (e) {
                picker.date.minutes(parseInt($(e.target).text(), 10));
                actions.showPicker.call(picker);
            },

            selectSecond: function (e) {
                picker.date.seconds(parseInt($(e.target).text(), 10));
                actions.showPicker.call(picker);
            }
        },

        doAction = function (e) {
            var oldDate = moment(picker.date),
                action = $(e.currentTarget).data('action'),
                rv = actions[action].apply(picker, arguments);
            stopEvent(e);
            if (!picker.date) {
                picker.date = moment({y: 1970});
            }
            set();
            fillTime();
            notifyChange(oldDate, e.type);
            return rv;
        },

        stopEvent = function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        keydown = function (e) {
            if (e.keyCode === 27) { // allow escape to hide picker
                picker.hide();
            }
        },

        change = function (e) {
            moment.locale(picker.options.language);
            var input = $(e.target), oldDate = moment(picker.date), newDate = moment(input.val(), picker.format, picker.options.useStrict);
            if (newDate.isValid() && !isInDisableDates(newDate) && isInEnableDates(newDate)) {
                update();
                picker.setValue(newDate);
                notifyChange(oldDate, e.type);
                set();
            }
            else {
                picker.viewDate = oldDate;
                picker.unset = true;
                notifyChange(oldDate, e.type);
                notifyError(newDate);
            }
        },

        showMode = function (dir) {
            if (dir) {
                picker.viewMode = Math.max(picker.minViewMode, Math.min(2, picker.viewMode + dir));
            }
            picker.widget.find('.datepicker > div').hide().filter('.datepicker-' + dpGlobal.modes[picker.viewMode].clsName).show();
        },

        attachDatePickerEvents = function () {
            var $this, $parent, expanded, closed, collapseData;
            picker.widget.on('click', '.datepicker *', $.proxy(click, this)); // this handles date picker clicks
            picker.widget.on('click', '[data-action]', $.proxy(doAction, this)); // this handles time picker clicks
            picker.widget.on('mousedown', $.proxy(stopEvent, this));
            picker.element.on('keydown', $.proxy(keydown, this));
            if (picker.options.pickDate && picker.options.pickTime) {
                picker.widget.on('click.togglePicker', '.accordion-toggle', function (e) {
                    e.stopPropagation();
                    $this = $(this);
                    $parent = $this.closest('ul');
                    expanded = $parent.find('.in');
                    closed = $parent.find('.collapse:not(.in)');

                    if (expanded && expanded.length) {
                        collapseData = expanded.data('collapse');
                        if (collapseData && collapseData.transitioning) {
                            return;
                        }
                        expanded.collapse('hide');
                        closed.collapse('show');
                        $this.find('span').toggleClass(picker.options.icons.time + ' ' + picker.options.icons.date);
                        if (picker.component) {
                            picker.component.find('span').toggleClass(picker.options.icons.time + ' ' + picker.options.icons.date);
                        }
                    }
                });
            }
            if (picker.isInput) {
                picker.element.on({
                    'click': $.proxy(picker.show, this),
                    'focus': $.proxy(picker.show, this),
                    'change': $.proxy(change, this),
                    'blur': $.proxy(picker.hide, this)
                });
            } else {
                picker.element.on({
                    'change': $.proxy(change, this)
                }, 'input');
                if (picker.component) {
                    picker.component.on('click', $.proxy(picker.show, this));
                    picker.component.on('mousedown', $.proxy(stopEvent, this));
                } else {
                    picker.element.on('click', $.proxy(picker.show, this));
                }
            }
        },

        attachDatePickerGlobalEvents = function () {
            $(window).on(
                'resize.datetimepicker' + picker.id, $.proxy(place, this));
            if (!picker.isInput) {
                $(document).on(
                    'mousedown.datetimepicker' + picker.id, $.proxy(picker.hide, this));
            }
        },

        detachDatePickerEvents = function () {
            picker.widget.off('click', '.datepicker *', picker.click);
            picker.widget.off('click', '[data-action]');
            picker.widget.off('mousedown', picker.stopEvent);
            if (picker.options.pickDate && picker.options.pickTime) {
                picker.widget.off('click.togglePicker');
            }
            if (picker.isInput) {
                picker.element.off({
                    'focus': picker.show,
                    'change': change,
                    'click': picker.show,
                    'blur' : picker.hide
                });
            } else {
                picker.element.off({
                    'change': change
                }, 'input');
                if (picker.component) {
                    picker.component.off('click', picker.show);
                    picker.component.off('mousedown', picker.stopEvent);
                } else {
                    picker.element.off('click', picker.show);
                }
            }
        },

        detachDatePickerGlobalEvents = function () {
            $(window).off('resize.datetimepicker' + picker.id);
            if (!picker.isInput) {
                $(document).off('mousedown.datetimepicker' + picker.id);
            }
        },

        isInFixed = function () {
            if (picker.element) {
                var parents = picker.element.parents(), inFixed = false, i;
                for (i = 0; i < parents.length; i++) {
                    if ($(parents[i]).css('position') === 'fixed') {
                        inFixed = true;
                        break;
                    }
                }
                return inFixed;
            } else {
                return false;
            }
        },

        set = function () {
            moment.locale(picker.options.language);
            var formatted = '';
            if (!picker.unset) {
                formatted = moment(picker.date).format(picker.format);
            }
            getPickerInput().val(formatted);
            picker.element.data('date', formatted);
            if (!picker.options.pickTime) {
                picker.hide();
            }
        },

        checkDate = function (direction, unit, amount) {
            moment.locale(picker.options.language);
            var newDate;
            if (direction === 'add') {
                newDate = moment(picker.date);
                if (newDate.hours() === 23) {
                    newDate.add(amount, unit);
                }
                newDate.add(amount, unit);
            }
            else {
                newDate = moment(picker.date).subtract(amount, unit);
            }
            if (isInDisableDates(moment(newDate.subtract(amount, unit))) || isInDisableDates(newDate)) {
                notifyError(newDate.format(picker.format));
                return;
            }

            if (direction === 'add') {
                picker.date.add(amount, unit);
            }
            else {
                picker.date.subtract(amount, unit);
            }
            picker.unset = false;
        },

        isInDisableDates = function (date, timeUnit) {
            moment.locale(picker.options.language);
            var maxDate = moment(picker.options.maxDate, picker.format, picker.options.useStrict),
                minDate = moment(picker.options.minDate, picker.format, picker.options.useStrict);

            if (timeUnit) {
                maxDate = maxDate.endOf(timeUnit);
                minDate = minDate.startOf(timeUnit);
            }

            if (date.isAfter(maxDate) || date.isBefore(minDate)) {
                return true;
            }
            if (picker.options.disabledDates === false) {
                return false;
            }
            return picker.options.disabledDates[date.format('YYYY-MM-DD')] === true;
        },
        isInEnableDates = function (date) {
            moment.locale(picker.options.language);
            if (picker.options.enabledDates === false) {
                return true;
            }
            return picker.options.enabledDates[date.format('YYYY-MM-DD')] === true;
        },

        indexGivenDates = function (givenDatesArray) {
            // Store given enabledDates and disabledDates as keys.
            // This way we can check their existence in O(1) time instead of looping through whole array.
            // (for example: picker.options.enabledDates['2014-02-27'] === true)
            var givenDatesIndexed = {}, givenDatesCount = 0, i;
            for (i = 0; i < givenDatesArray.length; i++) {
                if (moment.isMoment(givenDatesArray[i]) || givenDatesArray[i] instanceof Date) {
                    dDate = moment(givenDatesArray[i]);
                } else {
                    dDate = moment(givenDatesArray[i], picker.format, picker.options.useStrict);
                }
                if (dDate.isValid()) {
                    givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                    givenDatesCount++;
                }
            }
            if (givenDatesCount > 0) {
                return givenDatesIndexed;
            }
            return false;
        },

        padLeft = function (string) {
            string = string.toString();
            if (string.length >= 2) {
                return string;
            }
            return '0' + string;
        },

        getTemplate = function () {
            var
                headTemplate =
                        '<thead>' +
                            '<tr>' +
                                '<th class="prev">&lsaquo;</th><th colspan="' + (picker.options.calendarWeeks ? '6' : '5') + '" class="picker-switch"></th><th class="next">&rsaquo;</th>' +
                            '</tr>' +
                        '</thead>',
                contTemplate =
                        '<tbody><tr><td colspan="' + (picker.options.calendarWeeks ? '8' : '7') + '"></td></tr></tbody>',
                template = '<div class="datepicker-days">' +
                    '<table class="table-condensed">' + headTemplate + '<tbody></tbody></table>' +
                '</div>' +
                '<div class="datepicker-months">' +
                    '<table class="table-condensed">' + headTemplate + contTemplate + '</table>' +
                '</div>' +
                '<div class="datepicker-years">' +
                    '<table class="table-condensed">' + headTemplate + contTemplate + '</table>' +
                '</div>',
                ret = '';
            if (picker.options.pickDate && picker.options.pickTime) {
                ret = '<div class="bootstrap-datetimepicker-widget' + (picker.options.sideBySide ? ' timepicker-sbs' : '') + (picker.use24hours ? ' usetwentyfour' : '') + ' dropdown-menu" style="z-index:9999 !important;">';
                if (picker.options.sideBySide) {
                    ret += '<div class="row">' +
                       '<div class="col-sm-6 datepicker">' + template + '</div>' +
                       '<div class="col-sm-6 timepicker">' + tpGlobal.getTemplate() + '</div>' +
                     '</div>';
                } else {
                    ret += '<ul class="list-unstyled">' +
                        '<li' + (picker.options.collapse ? ' class="collapse in"' : '') + '>' +
                            '<div class="datepicker">' + template + '</div>' +
                        '</li>' +
                        '<li class="picker-switch accordion-toggle"><a class="btn" style="width:100%"><span class="' + picker.options.icons.time + '"></span></a></li>' +
                        '<li' + (picker.options.collapse ? ' class="collapse"' : '') + '>' +
                            '<div class="timepicker">' + tpGlobal.getTemplate() + '</div>' +
                        '</li>' +
                   '</ul>';
                }
                ret += '</div>';
                return ret;
            }
            if (picker.options.pickTime) {
                return (
                    '<div class="bootstrap-datetimepicker-widget dropdown-menu">' +
                        '<div class="timepicker">' + tpGlobal.getTemplate() + '</div>' +
                    '</div>'
                );
            }
            return (
                '<div class="bootstrap-datetimepicker-widget dropdown-menu">' +
                    '<div class="datepicker">' + template + '</div>' +
                '</div>'
            );
        },

        dpGlobal = {
            modes: [
                {
                    clsName: 'days',
                    navFnc: 'month',
                    navStep: 1
                },
                {
                    clsName: 'months',
                    navFnc: 'year',
                    navStep: 1
                },
                {
                    clsName: 'years',
                    navFnc: 'year',
                    navStep: 10
                }
            ]
        },

        tpGlobal = {
            hourTemplate: '<span data-action="showHours"   data-time-component="hours"   class="timepicker-hour"></span>',
            minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
            secondTemplate: '<span data-action="showSeconds"  data-time-component="seconds" class="timepicker-second"></span>'
        };

        tpGlobal.getTemplate = function () {
            return (
                '<div class="timepicker-picker">' +
                    '<table class="table-condensed">' +
                        '<tr>' +
                            '<td><a href="#" class="btn" data-action="incrementHours"><span class="' + picker.options.icons.up + '"></span></a></td>' +
                            '<td class="separator"></td>' +
                            '<td>' + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="incrementMinutes"><span class="' + picker.options.icons.up + '"></span></a>' : '') + '</td>' +
                            (picker.options.useSeconds ?
                                '<td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><span class="' + picker.options.icons.up + '"></span></a></td>' : '') +
                            (picker.use24hours ? '' : '<td class="separator"></td>') +
                        '</tr>' +
                        '<tr>' +
                            '<td>' + tpGlobal.hourTemplate + '</td> ' +
                            '<td class="separator">:</td>' +
                            '<td>' + (picker.options.useMinutes ? tpGlobal.minuteTemplate : '<span class="timepicker-minute">00</span>') + '</td> ' +
                            (picker.options.useSeconds ?
                                '<td class="separator">:</td><td>' + tpGlobal.secondTemplate + '</td>' : '') +
                            (picker.use24hours ? '' : '<td class="separator"></td>' +
                            '<td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>') +
                        '</tr>' +
                        '<tr>' +
                            '<td><a href="#" class="btn" data-action="decrementHours"><span class="' + picker.options.icons.down + '"></span></a></td>' +
                            '<td class="separator"></td>' +
                            '<td>' + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="decrementMinutes"><span class="' + picker.options.icons.down + '"></span></a>' : '') + '</td>' +
                            (picker.options.useSeconds ?
                                '<td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><span class="' + picker.options.icons.down + '"></span></a></td>' : '') +
                            (picker.use24hours ? '' : '<td class="separator"></td>') +
                        '</tr>' +
                    '</table>' +
                '</div>' +
                '<div class="timepicker-hours" data-action="selectHour">' +
                    '<table class="table-condensed"></table>' +
                '</div>' +
                '<div class="timepicker-minutes" data-action="selectMinute">' +
                    '<table class="table-condensed"></table>' +
                '</div>' +
                (picker.options.useSeconds ?
                    '<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>' : '')
            );
        };

        picker.destroy = function () {
            detachDatePickerEvents();
            detachDatePickerGlobalEvents();
            picker.widget.remove();
            picker.element.removeData('DateTimePicker');
            if (picker.component) {
                picker.component.removeData('DateTimePicker');
            }
        };

        picker.show = function (e) {
            if (getPickerInput().prop('disabled')) {
                return;
            }
            if (picker.options.useCurrent) {
                if (getPickerInput().val() === '') {
                    if (picker.options.minuteStepping !== 1) {
                        var mDate = moment(),
                        rInterval = picker.options.minuteStepping;
                        mDate.minutes((Math.round(mDate.minutes() / rInterval) * rInterval) % 60).seconds(0);
                        picker.setValue(mDate.format(picker.format));
                    } else {
                        picker.setValue(moment().format(picker.format));
                    }
                    notifyChange('', e.type);
                }
            }
            // if this is a click event on the input field and picker is already open don't hide it
            if (e && e.type === 'click' && picker.isInput && picker.widget.hasClass('picker-open')) {
                return;
            }
            if (picker.widget.hasClass('picker-open')) {
                picker.widget.hide();
                picker.widget.removeClass('picker-open');
            }
            else {
                picker.widget.show();
                picker.widget.addClass('picker-open');
            }
            picker.height = picker.component ? picker.component.outerHeight() : picker.element.outerHeight();
            place();
            picker.element.trigger({
                type: 'dp.show',
                date: moment(picker.date)
            });
            attachDatePickerGlobalEvents();
            if (e) {
                stopEvent(e);
            }
        };

        picker.disable = function () {
            var input = getPickerInput();
            if (input.prop('disabled')) {
                return;
            }
            input.prop('disabled', true);
            detachDatePickerEvents();
        };

        picker.enable = function () {
            var input = getPickerInput();
            if (!input.prop('disabled')) {
                return;
            }
            input.prop('disabled', false);
            attachDatePickerEvents();
        };

        picker.hide = function () {
            // Ignore event if in the middle of a picker transition
            var collapse = picker.widget.find('.collapse'), i, collapseData;
            for (i = 0; i < collapse.length; i++) {
                collapseData = collapse.eq(i).data('collapse');
                if (collapseData && collapseData.transitioning) {
                    return;
                }
            }
            picker.widget.hide();
            picker.widget.removeClass('picker-open');
            picker.viewMode = picker.startViewMode;
            showMode();
            picker.element.trigger({
                type: 'dp.hide',
                date: moment(picker.date)
            });
            detachDatePickerGlobalEvents();
        };

        picker.setValue = function (newDate) {
            moment.locale(picker.options.language);
            if (!newDate) {
                picker.unset = true;
                set();
            } else {
                picker.unset = false;
            }
            if (!moment.isMoment(newDate)) {
                newDate = (newDate instanceof Date) ? moment(newDate) : moment(newDate, picker.format, picker.options.useStrict);
            } else {
                newDate = newDate.locale(picker.options.language);
            }
            if (newDate.isValid()) {
                picker.date = newDate;
                set();
                picker.viewDate = moment({y: picker.date.year(), M: picker.date.month()});
                fillDate();
                fillTime();
            }
            else {
                notifyError(newDate);
            }
        };

        picker.getDate = function () {
            if (picker.unset) {
                return null;
            }
            return moment(picker.date);
        };

        picker.setDate = function (date) {
            var oldDate = moment(picker.date);
            if (!date) {
                picker.setValue(null);
            } else {
                picker.setValue(date);
            }
            notifyChange(oldDate, 'function');
        };

        picker.setDisabledDates = function (dates) {
            picker.options.disabledDates = indexGivenDates(dates);
            if (picker.viewDate) {
                update();
            }
        };

        picker.setEnabledDates = function (dates) {
            picker.options.enabledDates = indexGivenDates(dates);
            if (picker.viewDate) {
                update();
            }
        };

        picker.setMaxDate = function (date) {
            if (date === undefined) {
                return;
            }
            if (moment.isMoment(date) || date instanceof Date) {
                picker.options.maxDate = moment(date);
            } else {
                picker.options.maxDate = moment(date, picker.format, picker.options.useStrict);
            }
            if (picker.viewDate) {
                update();
            }
        };

        picker.setMinDate = function (date) {
            if (date === undefined) {
                return;
            }
            if (moment.isMoment(date) || date instanceof Date) {
                picker.options.minDate = moment(date);
            } else {
                picker.options.minDate = moment(date, picker.format, picker.options.useStrict);
            }
            if (picker.viewDate) {
                update();
            }
        };

        init();
    };

    $.fn.datetimepicker = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('DateTimePicker');
            if (!data) {
                $this.data('DateTimePicker', new DateTimePicker(this, options));
            }
        });
    };

    $.fn.datetimepicker.defaults = {
        format: false,
        pickDate: true,
        pickTime: true,
        useMinutes: true,
        useSeconds: false,
        useCurrent: true,
        calendarWeeks: false,
        minuteStepping: 1,
        minDate: moment({y: 1900}),
        maxDate: moment().add(100, 'y'),
        showToday: true,
        collapse: true,
        language: moment.locale(),
        defaultDate: '',
        disabledDates: false,
        enabledDates: false,
        icons: {},
        useStrict: false,
        direction: 'auto',
        sideBySide: false,
        daysOfWeekDisabled: [],
        widgetParent: false
    };
}));

/*!
 * Timepicker Component for Twitter Bootstrap
 *
 * Copyright 2013 Joris de Wit
 *
 * Contributors https://github.com/jdewit/bootstrap-timepicker/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function(d,c,a,e){var b=function(g,f){this.iconUp=f.iconUp||"fa fa-chevron-up";this.iconDown=f.iconDown||"fa fa-chevron-down";this.widget="";this.$element=d(g);this.defaultTime=f.defaultTime;this.disableFocus=f.disableFocus;this.disableMousewheel=f.disableMousewheel;this.isOpen=f.isOpen;this.minuteStep=f.minuteStep;this.modalBackdrop=f.modalBackdrop;this.orientation=f.orientation;this.secondStep=f.secondStep;this.showInputs=f.showInputs;this.showMeridian=f.showMeridian;this.showSeconds=f.showSeconds;this.template=f.template;this.appendWidgetTo=f.appendWidgetTo;this.showWidgetOnAddonClick=f.showWidgetOnAddonClick;this._init()};b.prototype={constructor:b,_init:function(){var f=this;if(this.showWidgetOnAddonClick&&(this.$element.parent().hasClass("input-append")||this.$element.parent().hasClass("input-prepend"))){this.$element.parent(".input-append, .input-prepend").find(".add-on").on({"click.timepicker":d.proxy(this.showWidget,this)});this.$element.on({"focus.timepicker":d.proxy(this.highlightUnit,this),"click.timepicker":d.proxy(this.highlightUnit,this),"keydown.timepicker":d.proxy(this.elementKeydown,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}else{if(this.template){this.$element.on({"focus.timepicker":d.proxy(this.showWidget,this),"click.timepicker":d.proxy(this.showWidget,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}else{this.$element.on({"focus.timepicker":d.proxy(this.highlightUnit,this),"click.timepicker":d.proxy(this.highlightUnit,this),"keydown.timepicker":d.proxy(this.elementKeydown,this),"blur.timepicker":d.proxy(this.blurElement,this),"mousewheel.timepicker DOMMouseScroll.timepicker":d.proxy(this.mousewheel,this)})}}if(this.template!==false){this.$widget=d(this.getTemplate()).on("click",d.proxy(this.widgetClick,this))}else{this.$widget=false}if(this.showInputs&&this.$widget!==false){this.$widget.find("input").each(function(){d(this).on({"click.timepicker":function(){d(this).select()},"keydown.timepicker":d.proxy(f.widgetKeydown,f),"keyup.timepicker":d.proxy(f.widgetKeyup,f)})})}this.setDefaultTime(this.defaultTime)},blurElement:function(){this.highlightedUnit=null;this.updateFromElementVal()},clear:function(){this.hour="";this.minute="";this.second="";this.meridian="";this.$element.val("")},decrementHour:function(){if(this.showMeridian){if(this.hour===1){this.hour=12}else{if(this.hour===12){this.hour--;return this.toggleMeridian()}else{if(this.hour===0){this.hour=11;return this.toggleMeridian()}else{this.hour--}}}}else{if(this.hour<=0){this.hour=23}else{this.hour--}}},decrementMinute:function(g){var f;if(g){f=this.minute-g}else{f=this.minute-this.minuteStep}if(f<0){this.decrementHour();this.minute=f+60}else{this.minute=f}},decrementSecond:function(){var f=this.second-this.secondStep;if(f<0){this.decrementMinute(true);this.second=f+60}else{this.second=f}},elementKeydown:function(f){switch(f.keyCode){case 9:case 27:this.updateFromElementVal();break;case 37:f.preventDefault();this.highlightPrevUnit();break;case 38:f.preventDefault();switch(this.highlightedUnit){case"hour":this.incrementHour();this.highlightHour();break;case"minute":this.incrementMinute();this.highlightMinute();break;case"second":this.incrementSecond();this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break}this.update();break;case 39:f.preventDefault();this.highlightNextUnit();break;case 40:f.preventDefault();switch(this.highlightedUnit){case"hour":this.decrementHour();this.highlightHour();break;case"minute":this.decrementMinute();this.highlightMinute();break;case"second":this.decrementSecond();this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break}this.update();break}},getCursorPosition:function(){var g=this.$element.get(0);if("selectionStart" in g){return g.selectionStart}else{if(a.selection){g.focus();var h=a.selection.createRange(),f=a.selection.createRange().text.length;h.moveStart("character",-g.value.length);return h.text.length-f}}},getTemplate:function(){var h,j,g,f,i,k;if(this.showInputs){j='<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>';g='<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>';f='<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>';i='<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>'}else{j='<span class="bootstrap-timepicker-hour"></span>';g='<span class="bootstrap-timepicker-minute"></span>';f='<span class="bootstrap-timepicker-second"></span>';i='<span class="bootstrap-timepicker-meridian"></span>'}k='<table><tr><td><a href="#" data-action="incrementHour"><i class="'+this.iconUp+'"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="'+this.iconUp+'"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="'+this.iconUp+'"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="'+this.iconUp+'"></i></a></td>':"")+"</tr><tr><td>"+j+'</td> <td class="separator">:</td><td>'+g+"</td> "+(this.showSeconds?'<td class="separator">:</td><td>'+f+"</td>":"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td>'+i+"</td>":"")+'</tr><tr><td><a href="#" data-action="decrementHour"><i class="'+this.iconDown+'"></i></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><i class="'+this.iconDown+'"></i></a></td>'+(this.showSeconds?'<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="'+this.iconDown+'"></i></a></td>':"")+(this.showMeridian?'<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="'+this.iconDown+'"></i></a></td>':"")+"</tr></table>";switch(this.template){case"modal":h='<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+(this.modalBackdrop?"true":"false")+'"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">×</a><h3>Pick a Time</h3></div><div class="modal-content">'+k+'</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';break;case"dropdown":h='<div class="bootstrap-timepicker-widget dropdown-menu">'+k+"</div>";break}return h},getTime:function(){if(this.hour===""){return""}return this.hour+":"+(this.minute.toString().length===1?"0"+this.minute:this.minute)+(this.showSeconds?":"+(this.second.toString().length===1?"0"+this.second:this.second):"")+(this.showMeridian?" "+this.meridian:"")},hideWidget:function(){if(this.isOpen===false){return}this.$element.trigger({type:"hide.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}});if(this.template==="modal"&&this.$widget.modal){this.$widget.modal("hide")}else{this.$widget.removeClass("open")}d(a).off("mousedown.timepicker, touchend.timepicker");this.isOpen=false;this.$widget.detach()},highlightUnit:function(){this.position=this.getCursorPosition();if(this.position>=0&&this.position<=2){this.highlightHour()}else{if(this.position>=3&&this.position<=5){this.highlightMinute()}else{if(this.position>=6&&this.position<=8){if(this.showSeconds){this.highlightSecond()}else{this.highlightMeridian()}}else{if(this.position>=9&&this.position<=11){this.highlightMeridian()}}}}},highlightNextUnit:function(){switch(this.highlightedUnit){case"hour":this.highlightMinute();break;case"minute":if(this.showSeconds){this.highlightSecond()}else{if(this.showMeridian){this.highlightMeridian()}else{this.highlightHour()}}break;case"second":if(this.showMeridian){this.highlightMeridian()}else{this.highlightHour()}break;case"meridian":this.highlightHour();break}},highlightPrevUnit:function(){switch(this.highlightedUnit){case"hour":if(this.showMeridian){this.highlightMeridian()}else{if(this.showSeconds){this.highlightSecond()}else{this.highlightMinute()}}break;case"minute":this.highlightHour();break;case"second":this.highlightMinute();break;case"meridian":if(this.showSeconds){this.highlightSecond()}else{this.highlightMinute()}break}},highlightHour:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="hour";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(0,1)}else{f.setSelectionRange(0,2)}},0)}},highlightMinute:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="minute";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(2,4)}else{f.setSelectionRange(3,5)}},0)}},highlightSecond:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="second";if(f.setSelectionRange){setTimeout(function(){if(g.hour<10){f.setSelectionRange(5,7)}else{f.setSelectionRange(6,8)}},0)}},highlightMeridian:function(){var f=this.$element.get(0),g=this;this.highlightedUnit="meridian";if(f.setSelectionRange){if(this.showSeconds){setTimeout(function(){if(g.hour<10){f.setSelectionRange(8,10)}else{f.setSelectionRange(9,11)}},0)}else{setTimeout(function(){if(g.hour<10){f.setSelectionRange(5,7)}else{f.setSelectionRange(6,8)}},0)}}},incrementHour:function(){if(this.showMeridian){if(this.hour===11){this.hour++;return this.toggleMeridian()}else{if(this.hour===12){this.hour=0}}}if(this.hour===23){this.hour=0;return}this.hour++},incrementMinute:function(g){var f;if(g){f=this.minute+g}else{f=this.minute+this.minuteStep-(this.minute%this.minuteStep)}if(f>59){this.incrementHour();this.minute=f-60}else{this.minute=f}},incrementSecond:function(){var f=this.second+this.secondStep-(this.second%this.secondStep);if(f>59){this.incrementMinute(true);this.second=f-60}else{this.second=f}},mousewheel:function(g){if(this.disableMousewheel){return}g.preventDefault();g.stopPropagation();var h=g.originalEvent.wheelDelta||-g.originalEvent.detail,f=null;if(g.type==="mousewheel"){f=(g.originalEvent.wheelDelta*-1)}else{if(g.type==="DOMMouseScroll"){f=40*g.originalEvent.detail}}if(f){g.preventDefault();d(this).scrollTop(f+d(this).scrollTop())}switch(this.highlightedUnit){case"minute":if(h>0){this.incrementMinute()}else{this.decrementMinute()}this.highlightMinute();break;case"second":if(h>0){this.incrementSecond()}else{this.decrementSecond()}this.highlightSecond();break;case"meridian":this.toggleMeridian();this.highlightMeridian();break;default:if(h>0){this.incrementHour()}else{this.decrementHour()}this.highlightHour();break}return false},place:function(){if(this.isInline){return}var h=this.$widget.outerWidth(),o=this.$widget.outerHeight(),j=10,l=d(c).width(),g=d(c).height(),k=d(c).scrollTop();var r=parseInt(this.$element.parents().filter(function(){}).first().css("z-index"),10)+10;var n=this.component?this.component.parent().offset():this.$element.offset();var s=this.component?this.component.outerHeight(true):this.$element.outerHeight(false);var i=this.component?this.component.outerWidth(true):this.$element.outerWidth(false);var m=n.left,q=n.top;this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left");if(this.orientation.x!=="auto"){this.picker.addClass("datepicker-orient-"+this.orientation.x);if(this.orientation.x==="right"){m-=h-i}}else{this.$widget.addClass("timepicker-orient-left");if(n.left<0){m-=n.left-j}else{if(n.left+h>l){m=l-h-j}}}var f=this.orientation.y,p,t;if(f==="auto"){p=-k+n.top-o;t=k+g-(n.top+s+o);if(Math.max(p,t)===t){f="top"}else{f="bottom"}}this.$widget.addClass("timepicker-orient-"+f);if(f==="top"){q+=s}else{q-=o+parseInt(this.$widget.css("padding-top"),10)}this.$widget.css({top:q,left:m,zIndex:r})},remove:function(){d("document").off(".timepicker");if(this.$widget){this.$widget.remove()}delete this.$element.data().timepicker},setDefaultTime:function(h){if(!this.$element.val()){if(h==="current"){var f=new Date(),g=f.getHours(),j=f.getMinutes(),k=f.getSeconds(),i="AM";if(k!==0){k=Math.ceil(f.getSeconds()/this.secondStep)*this.secondStep;if(k===60){j+=1;k=0}}if(j!==0){j=Math.ceil(f.getMinutes()/this.minuteStep)*this.minuteStep;if(j===60){g+=1;j=0}}if(this.showMeridian){if(g===0){g=12}else{if(g>=12){if(g>12){g=g-12}i="PM"}else{i="AM"}}}this.hour=g;this.minute=j;this.second=k;this.meridian=i;this.update()}else{if(h===false){this.hour=0;this.minute=0;this.second=0;this.meridian="AM"}else{this.setTime(h)}}}else{this.updateFromElementVal()}},setTime:function(k,i){if(!k){this.clear();return}var j,f,l,g,h;if(typeof k==="object"&&k.getMonth){f=k.getHours();l=k.getMinutes();g=k.getSeconds();if(this.showMeridian){h="AM";if(f>12){h="PM";f=f%12}if(f===12){h="PM"}}}else{if(k.match(/p/i)!==null){h="PM"}else{h="AM"}k=k.replace(/[^0-9\:]/g,"");j=k.split(":");f=j[0]?j[0].toString():j.toString();l=j[1]?j[1].toString():"";g=j[2]?j[2].toString():"";if(f.length>4){g=f.substr(4,2)}if(f.length>2){l=f.substr(2,2);f=f.substr(0,2)}if(l.length>2){g=l.substr(2,2);l=l.substr(0,2)}if(g.length>2){g=g.substr(2,2)}f=parseInt(f,10);l=parseInt(l,10);g=parseInt(g,10);if(isNaN(f)){f=0}if(isNaN(l)){l=0}if(isNaN(g)){g=0}if(this.showMeridian){if(f<1){f=1}else{if(f>12){f=12}}}else{if(f>=24){f=23}else{if(f<0){f=0}}if(f<13&&h==="PM"){f=f+12}}if(l<0){l=0}else{if(l>=60){l=59}}if(this.showSeconds){if(isNaN(g)){g=0}else{if(g<0){g=0}else{if(g>=60){g=59}}}}}this.hour=f;this.minute=l;this.second=g;this.meridian=h;this.update(i)},showWidget:function(){if(this.isOpen){return}if(this.$element.is(":disabled")){return}this.$widget.appendTo(this.appendWidgetTo);var f=this;d(a).on("mousedown.timepicker, touchend.timepicker",function(g){if(!(f.$element.parent().find(g.target).length||f.$widget.is(g.target)||f.$widget.find(g.target).length)){f.hideWidget()}});this.$element.trigger({type:"show.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}});this.place();if(this.disableFocus){this.$element.blur()}if(this.hour===""){if(this.defaultTime){this.setDefaultTime(this.defaultTime)}else{this.setTime("0:0:0")}}if(this.template==="modal"&&this.$widget.modal){this.$widget.modal("show").on("hidden",d.proxy(this.hideWidget,this))}else{if(this.isOpen===false){this.$widget.addClass("open")}}this.isOpen=true},toggleMeridian:function(){this.meridian=this.meridian==="AM"?"PM":"AM"},update:function(f){this.updateElement();if(!f){this.updateWidget()}this.$element.trigger({type:"changeTime.timepicker",time:{value:this.getTime(),hours:this.hour,minutes:this.minute,seconds:this.second,meridian:this.meridian}})},updateElement:function(){this.$element.val(this.getTime()).change()},updateFromElementVal:function(){this.setTime(this.$element.val())},updateWidget:function(){if(this.$widget===false){return}var f=this.hour,h=this.minute.toString().length===1?"0"+this.minute:this.minute,g=this.second.toString().length===1?"0"+this.second:this.second;if(this.showInputs){this.$widget.find("input.bootstrap-timepicker-hour").val(f);this.$widget.find("input.bootstrap-timepicker-minute").val(h);if(this.showSeconds){this.$widget.find("input.bootstrap-timepicker-second").val(g)}if(this.showMeridian){this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)}}else{this.$widget.find("span.bootstrap-timepicker-hour").text(f);this.$widget.find("span.bootstrap-timepicker-minute").text(h);if(this.showSeconds){this.$widget.find("span.bootstrap-timepicker-second").text(g)}if(this.showMeridian){this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian)}}},updateFromWidgetInputs:function(){if(this.$widget===false){return}var f=this.$widget.find("input.bootstrap-timepicker-hour").val()+":"+this.$widget.find("input.bootstrap-timepicker-minute").val()+(this.showSeconds?":"+this.$widget.find("input.bootstrap-timepicker-second").val():"")+(this.showMeridian?this.$widget.find("input.bootstrap-timepicker-meridian").val():"");this.setTime(f,true)},widgetClick:function(g){g.stopPropagation();g.preventDefault();var h=d(g.target),f=h.closest("a").data("action");if(f){this[f]()}this.update();if(h.is("input")){h.get(0).setSelectionRange(0,2)}},widgetKeydown:function(g){var h=d(g.target),f=h.attr("class").replace("bootstrap-timepicker-","");switch(g.keyCode){case 9:if((this.showMeridian&&f==="meridian")||(this.showSeconds&&f==="second")||(!this.showMeridian&&!this.showSeconds&&f==="minute")){return this.hideWidget()}break;case 27:this.hideWidget();break;case 38:g.preventDefault();switch(f){case"hour":this.incrementHour();break;case"minute":this.incrementMinute();break;case"second":this.incrementSecond();break;case"meridian":this.toggleMeridian();break}this.setTime(this.getTime());h.get(0).setSelectionRange(0,2);break;case 40:g.preventDefault();switch(f){case"hour":this.decrementHour();break;case"minute":this.decrementMinute();break;case"second":this.decrementSecond();break;case"meridian":this.toggleMeridian();break}this.setTime(this.getTime());h.get(0).setSelectionRange(0,2);break}},widgetKeyup:function(f){if((f.keyCode===65)||(f.keyCode===77)||(f.keyCode===80)||(f.keyCode===46)||(f.keyCode===8)||(f.keyCode>=46&&f.keyCode<=57)){this.updateFromWidgetInputs()}}};d.fn.timepicker=function(g){var f=Array.apply(null,arguments);f.shift();return this.each(function(){var j=d(this),i=j.data("timepicker"),h=typeof g==="object"&&g;if(!i){j.data("timepicker",(i=new b(this,d.extend({},d.fn.timepicker.defaults,h,d(this).data()))))}if(typeof g==="string"){i[g].apply(i,f)}})};d.fn.timepicker.defaults={defaultTime:"current",disableFocus:false,disableMousewheel:false,isOpen:false,minuteStep:15,modalBackdrop:false,orientation:{x:"auto",y:"auto"},secondStep:15,showSeconds:false,showInputs:true,showMeridian:true,template:"dropdown",appendWidgetTo:"body",showWidgetOnAddonClick:true};d.fn.timepicker.Constructor=b})(jQuery,window,document);
/**
* @version: 1.3.7
* @author: Dan Grossman http://www.dangrossman.info/
* @date: 2014-04-29
* @copyright: Copyright (c) 2012-2014 Dan Grossman. All rights reserved.
* @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
* @website: http://www.improvely.com/
*/
!function($,moment){var DateRangePicker=function(element,options,cb){this.parentEl="body";this.element=$(element);var DRPTemplate='<div class="daterangepicker dropdown-menu">'+'<div class="calendar left"></div>'+'<div class="calendar right"></div>'+'<div class="ranges">'+'<div class="range_inputs">'+'<div class="daterangepicker_start_input">'+'<label for="daterangepicker_start"></label>'+'<input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" />'+"</div>"+'<div class="daterangepicker_end_input">'+'<label for="daterangepicker_end"></label>'+'<input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" />'+"</div>"+'<button class="applyBtn" disabled="disabled"></button>&nbsp;'+'<button class="cancelBtn"></button>'+"</div>"+"</div>"+"</div>";if(typeof options!=="object"||options===null)options={};this.parentEl=typeof options==="object"&&options.parentEl&&$(options.parentEl).length?$(options.parentEl):$(this.parentEl);this.container=$(DRPTemplate).appendTo(this.parentEl);this.setOptions(options,cb);var c=this.container;$.each(this.buttonClasses,function(idx,val){c.find("button").addClass(val)});this.container.find(".daterangepicker_start_input label").html(this.locale.fromLabel);this.container.find(".daterangepicker_end_input label").html(this.locale.toLabel);if(this.applyClass.length)this.container.find(".applyBtn").addClass(this.applyClass);if(this.cancelClass.length)this.container.find(".cancelBtn").addClass(this.cancelClass);this.container.find(".applyBtn").html(this.locale.applyLabel);this.container.find(".cancelBtn").html(this.locale.cancelLabel);this.container.find(".calendar").on("click.daterangepicker",".prev",$.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",$.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",$.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",$.proxy(this.enterDate,this)).on("mouseleave.daterangepicker","td.available",$.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",$.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.monthselect",$.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.ampmselect",$.proxy(this.updateTime,this));this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",$.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",$.proxy(this.clickCancel,this)).on("click.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",$.proxy(this.showCalendars,this)).on("click.daterangepicker","li",$.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",$.proxy(this.enterRange,this)).on("mouseleave.daterangepicker","li",$.proxy(this.updateFormInputs,this));if(this.element.is("input")){this.element.on({"click.daterangepicker":$.proxy(this.show,this),"focus.daterangepicker":$.proxy(this.show,this),"keyup.daterangepicker":$.proxy(this.updateFromControl,this)})}else{this.element.on("click.daterangepicker",$.proxy(this.toggle,this))}};DateRangePicker.prototype={constructor:DateRangePicker,setOptions:function(options,callback){this.startDate=moment().startOf("day");this.endDate=moment().endOf("day");this.minDate=false;this.maxDate=false;this.dateLimit=false;this.showDropdowns=false;this.showWeekNumbers=false;this.timePicker=false;this.timePickerIncrement=30;this.timePicker12Hour=true;this.singleDatePicker=false;this.ranges={};this.opens="right";if(this.element.hasClass("pull-right"))this.opens="left";this.buttonClasses=["btn","btn-small"];this.applyClass="btn-success";this.cancelClass="btn-default";this.format="MM/DD/YYYY";this.separator=" - ";this.locale={applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:moment()._lang._weekdaysMin.slice(),monthNames:moment()._lang._monthsShort.slice(),firstDay:0};this.cb=function(){};if(typeof options.format==="string")this.format=options.format;if(typeof options.separator==="string")this.separator=options.separator;if(typeof options.startDate==="string")this.startDate=moment(options.startDate,this.format);if(typeof options.endDate==="string")this.endDate=moment(options.endDate,this.format);if(typeof options.minDate==="string")this.minDate=moment(options.minDate,this.format);if(typeof options.maxDate==="string")this.maxDate=moment(options.maxDate,this.format);if(typeof options.startDate==="object")this.startDate=moment(options.startDate);if(typeof options.endDate==="object")this.endDate=moment(options.endDate);if(typeof options.minDate==="object")this.minDate=moment(options.minDate);if(typeof options.maxDate==="object")this.maxDate=moment(options.maxDate);if(typeof options.applyClass==="string")this.applyClass=options.applyClass;if(typeof options.cancelClass==="string")this.cancelClass=options.cancelClass;if(typeof options.dateLimit==="object")this.dateLimit=options.dateLimit;if(typeof options.locale==="object"){if(typeof options.locale.daysOfWeek==="object"){this.locale.daysOfWeek=options.locale.daysOfWeek.slice()}if(typeof options.locale.monthNames==="object"){this.locale.monthNames=options.locale.monthNames.slice()}if(typeof options.locale.firstDay==="number"){this.locale.firstDay=options.locale.firstDay;var iterator=options.locale.firstDay;while(iterator>0){this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());iterator--}}if(typeof options.locale.applyLabel==="string"){this.locale.applyLabel=options.locale.applyLabel}if(typeof options.locale.cancelLabel==="string"){this.locale.cancelLabel=options.locale.cancelLabel}if(typeof options.locale.fromLabel==="string"){this.locale.fromLabel=options.locale.fromLabel}if(typeof options.locale.toLabel==="string"){this.locale.toLabel=options.locale.toLabel}if(typeof options.locale.weekLabel==="string"){this.locale.weekLabel=options.locale.weekLabel}if(typeof options.locale.customRangeLabel==="string"){this.locale.customRangeLabel=options.locale.customRangeLabel}}if(typeof options.opens==="string")this.opens=options.opens;if(typeof options.showWeekNumbers==="boolean"){this.showWeekNumbers=options.showWeekNumbers}if(typeof options.buttonClasses==="string"){this.buttonClasses=[options.buttonClasses]}if(typeof options.buttonClasses==="object"){this.buttonClasses=options.buttonClasses}if(typeof options.showDropdowns==="boolean"){this.showDropdowns=options.showDropdowns}if(typeof options.singleDatePicker==="boolean"){this.singleDatePicker=options.singleDatePicker}if(typeof options.timePicker==="boolean"){this.timePicker=options.timePicker}if(typeof options.timePickerIncrement==="number"){this.timePickerIncrement=options.timePickerIncrement}if(typeof options.timePicker12Hour==="boolean"){this.timePicker12Hour=options.timePicker12Hour}var start,end,range;if(typeof options.startDate==="undefined"&&typeof options.endDate==="undefined"){if($(this.element).is("input[type=text]")){var val=$(this.element).val();var split=val.split(this.separator);start=end=null;if(split.length==2){start=moment(split[0],this.format);end=moment(split[1],this.format)}else if(this.singleDatePicker){start=moment(val,this.format);end=moment(val,this.format)}if(start!==null&&end!==null){this.startDate=start;this.endDate=end}}}if(typeof options.ranges==="object"){for(range in options.ranges){start=moment(options.ranges[range][0]);end=moment(options.ranges[range][1]);if(this.minDate&&start.isBefore(this.minDate))start=moment(this.minDate);if(this.maxDate&&end.isAfter(this.maxDate))end=moment(this.maxDate);if(this.minDate&&end.isBefore(this.minDate)||this.maxDate&&start.isAfter(this.maxDate)){continue}this.ranges[range]=[start,end]}var list="<ul>";for(range in this.ranges){list+="<li>"+range+"</li>"}list+="<li>"+this.locale.customRangeLabel+"</li>";list+="</ul>";this.container.find(".ranges ul").remove();this.container.find(".ranges").prepend(list)}if(typeof callback==="function"){this.cb=callback}if(!this.timePicker){this.startDate=this.startDate.startOf("day");this.endDate=this.endDate.endOf("day")}if(this.singleDatePicker){this.opens="right";this.container.find(".calendar.right").show();this.container.find(".calendar.left").hide();this.container.find(".ranges").hide();if(!this.container.find(".calendar.right").hasClass("single"))this.container.find(".calendar.right").addClass("single")}else{this.container.find(".calendar.right").removeClass("single");this.container.find(".ranges").show()}this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.oldChosenLabel=this.chosenLabel;this.leftCalendar={month:moment([this.startDate.year(),this.startDate.month(),1,this.startDate.hour(),this.startDate.minute()]),calendar:[]};this.rightCalendar={month:moment([this.endDate.year(),this.endDate.month(),1,this.endDate.hour(),this.endDate.minute()]),calendar:[]};if(this.opens=="right"){var left=this.container.find(".calendar.left");var right=this.container.find(".calendar.right");left.removeClass("left").addClass("right");right.removeClass("right").addClass("left")}if(typeof options.ranges==="undefined"&&!this.singleDatePicker){this.container.addClass("show-calendar")}this.container.addClass("opens"+this.opens);this.updateView();this.updateCalendars()},setStartDate:function(startDate){if(typeof startDate==="string")this.startDate=moment(startDate,this.format);if(typeof startDate==="object")this.startDate=moment(startDate);if(!this.timePicker)this.startDate=this.startDate.startOf("day");this.oldStartDate=this.startDate.clone();this.updateView();this.updateCalendars()},setEndDate:function(endDate){if(typeof endDate==="string")this.endDate=moment(endDate,this.format);if(typeof endDate==="object")this.endDate=moment(endDate);if(!this.timePicker)this.endDate=this.endDate.endOf("day");this.oldEndDate=this.endDate.clone();this.updateView();this.updateCalendars()},updateView:function(){this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());this.updateFormInputs()},updateFormInputs:function(){this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format));this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format));if(this.startDate.isSame(this.endDate)||this.startDate.isBefore(this.endDate)){this.container.find("button.applyBtn").removeAttr("disabled")}else{this.container.find("button.applyBtn").attr("disabled","disabled")}},updateFromControl:function(){if(!this.element.is("input"))return;if(!this.element.val().length)return;var dateString=this.element.val().split(this.separator),start=null,end=null;if(dateString.length===2){start=moment(dateString[0],this.format);end=moment(dateString[1],this.format)}if(this.singleDatePicker||start===null||end===null){start=moment(this.element.val(),this.format);end=start}if(end.isBefore(start))return;this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.startDate=start;this.endDate=end;if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))this.notify();this.updateCalendars()},notify:function(){this.updateView();this.cb(this.startDate,this.endDate,this.chosenLabel)},move:function(){var parentOffset={top:0,left:0};if(!this.parentEl.is("body")){parentOffset={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()}}if(this.opens=="left"){this.container.css({top:this.element.offset().top+this.element.outerHeight()-parentOffset.top,right:$(window).width()-this.element.offset().left-this.element.outerWidth()-parentOffset.left,left:"auto"});if(this.container.offset().left<0){this.container.css({right:"auto",left:9})}}else{this.container.css({top:this.element.offset().top+this.element.outerHeight()-parentOffset.top,left:this.element.offset().left-parentOffset.left,right:"auto"});if(this.container.offset().left+this.container.outerWidth()>$(window).width()){this.container.css({left:"auto",right:0})}}},toggle:function(e){if(this.element.hasClass("active")){this.hide()}else{this.show()}},show:function(e){this.element.addClass("active");this.container.show();this.move();this._outsideClickProxy=$.proxy(function(e){this.outsideClick(e)},this);$(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy);this.element.trigger("show.daterangepicker",this)},outsideClick:function(e){var target=$(e.target);if(target.closest(this.element).length||target.closest(this.container).length||target.closest(".calendar-date").length)return;this.hide()},hide:function(e){$(document).off("mousedown.daterangepicker",this._outsideClickProxy).off("click.daterangepicker",this._outsideClickProxy).off("focusin.daterangepicker",this._outsideClickProxy);this.element.removeClass("active");this.container.hide();if(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))this.notify();this.oldStartDate=this.startDate.clone();this.oldEndDate=this.endDate.clone();this.element.trigger("hide.daterangepicker",this)},enterRange:function(e){var label=e.target.innerHTML;if(label==this.locale.customRangeLabel){this.updateView()}else{var dates=this.ranges[label];this.container.find("input[name=daterangepicker_start]").val(dates[0].format(this.format));this.container.find("input[name=daterangepicker_end]").val(dates[1].format(this.format))}},showCalendars:function(){this.container.addClass("show-calendar");this.move()},hideCalendars:function(){this.container.removeClass("show-calendar")},updateInputText:function(){if(this.element.is("input")&&!this.singleDatePicker){this.element.val(this.startDate.format(this.format)+this.separator+this.endDate.format(this.format))}else if(this.element.is("input")){this.element.val(this.startDate.format(this.format))}},clickRange:function(e){var label=e.target.innerHTML;this.chosenLabel=label;if(label==this.locale.customRangeLabel){this.showCalendars()}else{var dates=this.ranges[label];this.startDate=dates[0];this.endDate=dates[1];if(!this.timePicker){this.startDate.startOf("day");this.endDate.endOf("day")}this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());this.updateCalendars();this.updateInputText();this.hideCalendars();this.hide();this.element.trigger("apply.daterangepicker",this)}},clickPrev:function(e){var cal=$(e.target).parents(".calendar");if(cal.hasClass("left")){this.leftCalendar.month.subtract("month",1)}else{this.rightCalendar.month.subtract("month",1)}this.updateCalendars()},clickNext:function(e){var cal=$(e.target).parents(".calendar");if(cal.hasClass("left")){this.leftCalendar.month.add("month",1)}else{this.rightCalendar.month.add("month",1)}this.updateCalendars()},enterDate:function(e){var title=$(e.target).attr("data-title");var row=title.substr(1,1);var col=title.substr(3,1);var cal=$(e.target).parents(".calendar");if(cal.hasClass("left")){this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[row][col].format(this.format))}else{this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[row][col].format(this.format))}},clickDate:function(e){var title=$(e.target).attr("data-title");var row=title.substr(1,1);var col=title.substr(3,1);var cal=$(e.target).parents(".calendar");var startDate,endDate;if(cal.hasClass("left")){startDate=this.leftCalendar.calendar[row][col];endDate=this.endDate;if(typeof this.dateLimit==="object"){var maxDate=moment(startDate).add(this.dateLimit).startOf("day");if(endDate.isAfter(maxDate)){endDate=maxDate}}}else{startDate=this.startDate;endDate=this.rightCalendar.calendar[row][col];if(typeof this.dateLimit==="object"){var minDate=moment(endDate).subtract(this.dateLimit).startOf("day");if(startDate.isBefore(minDate)){startDate=minDate}}}if(this.singleDatePicker&&cal.hasClass("left")){endDate=startDate.clone()}else if(this.singleDatePicker&&cal.hasClass("right")){startDate=endDate.clone()}cal.find("td").removeClass("active");if(startDate.isSame(endDate)||startDate.isBefore(endDate)){$(e.target).addClass("active");this.startDate=startDate;this.endDate=endDate;this.chosenLabel=this.locale.customRangeLabel}else if(startDate.isAfter(endDate)){$(e.target).addClass("active");var difference=this.endDate.diff(this.startDate);this.startDate=startDate;this.endDate=moment(startDate).add("ms",difference);this.chosenLabel=this.locale.customRangeLabel}this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());this.updateCalendars();if(!this.timePicker)endDate.endOf("day");if(this.singleDatePicker)this.clickApply()},clickApply:function(e){this.updateInputText();this.hide();this.element.trigger("apply.daterangepicker",this)},clickCancel:function(e){this.startDate=this.oldStartDate;this.endDate=this.oldEndDate;this.chosenLabel=this.oldChosenLabel;this.updateView();this.updateCalendars();this.hide();this.element.trigger("cancel.daterangepicker",this)},updateMonthYear:function(e){var isLeft=$(e.target).closest(".calendar").hasClass("left"),leftOrRight=isLeft?"left":"right",cal=this.container.find(".calendar."+leftOrRight);var month=parseInt(cal.find(".monthselect").val(),10);var year=cal.find(".yearselect").val();this[leftOrRight+"Calendar"].month.month(month).year(year);this.updateCalendars()},updateTime:function(e){var cal=$(e.target).closest(".calendar"),isLeft=cal.hasClass("left");var hour=parseInt(cal.find(".hourselect").val(),10);var minute=parseInt(cal.find(".minuteselect").val(),10);if(this.timePicker12Hour){var ampm=cal.find(".ampmselect").val();if(ampm==="PM"&&hour<12)hour+=12;if(ampm==="AM"&&hour===12)hour=0}if(isLeft){var start=this.startDate.clone();start.hour(hour);start.minute(minute);this.startDate=start;this.leftCalendar.month.hour(hour).minute(minute)}else{var end=this.endDate.clone();end.hour(hour);end.minute(minute);this.endDate=end;this.rightCalendar.month.hour(hour).minute(minute)}this.updateCalendars()},updateCalendars:function(){this.leftCalendar.calendar=this.buildCalendar(this.leftCalendar.month.month(),this.leftCalendar.month.year(),this.leftCalendar.month.hour(),this.leftCalendar.month.minute(),"left");this.rightCalendar.calendar=this.buildCalendar(this.rightCalendar.month.month(),this.rightCalendar.month.year(),this.rightCalendar.month.hour(),this.rightCalendar.month.minute(),"right");this.container.find(".calendar.left").empty().html(this.renderCalendar(this.leftCalendar.calendar,this.startDate,this.minDate,this.maxDate));this.container.find(".calendar.right").empty().html(this.renderCalendar(this.rightCalendar.calendar,this.endDate,this.startDate,this.maxDate));this.container.find(".ranges li").removeClass("active");var customRange=true;var i=0;for(var range in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[range][0])&&this.endDate.isSame(this.ranges[range][1])){customRange=false;this.chosenLabel=this.container.find(".ranges li:eq("+i+")").addClass("active").html()}}else{if(this.startDate.format("YYYY-MM-DD")==this.ranges[range][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[range][1].format("YYYY-MM-DD")){customRange=false;this.chosenLabel=this.container.find(".ranges li:eq("+i+")").addClass("active").html()}}i++}if(customRange){this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html()}},buildCalendar:function(month,year,hour,minute,side){var firstDay=moment([year,month,1]);var lastMonth=moment(firstDay).subtract("month",1).month();var lastYear=moment(firstDay).subtract("month",1).year();var daysInLastMonth=moment([lastYear,lastMonth]).daysInMonth();var dayOfWeek=firstDay.day();var i;var calendar=[];for(i=0;i<6;i++){calendar[i]=[]}var startDay=daysInLastMonth-dayOfWeek+this.locale.firstDay+1;if(startDay>daysInLastMonth)startDay-=7;if(dayOfWeek==this.locale.firstDay)startDay=daysInLastMonth-6;var curDate=moment([lastYear,lastMonth,startDay,12,minute]);var col,row;for(i=0,col=0,row=0;i<42;i++,col++,curDate=moment(curDate).add("hour",24)){if(i>0&&col%7===0){col=0;row++}calendar[row][col]=curDate.clone().hour(hour);curDate.hour(12)}return calendar},renderDropdowns:function(selected,minDate,maxDate){var currentMonth=selected.month();var monthHtml='<select class="monthselect">';var inMinYear=false;var inMaxYear=false;for(var m=0;m<12;m++){if((!inMinYear||m>=minDate.month())&&(!inMaxYear||m<=maxDate.month())){monthHtml+="<option value='"+m+"'"+(m===currentMonth?" selected='selected'":"")+">"+this.locale.monthNames[m]+"</option>"}}monthHtml+="</select>";var currentYear=selected.year();var maxYear=maxDate&&maxDate.year()||currentYear+5;var minYear=minDate&&minDate.year()||currentYear-50;var yearHtml='<select class="yearselect">';for(var y=minYear;y<=maxYear;y++){yearHtml+='<option value="'+y+'"'+(y===currentYear?' selected="selected"':"")+">"+y+"</option>"}yearHtml+="</select>";return monthHtml+yearHtml},renderCalendar:function(calendar,selected,minDate,maxDate){var html='<div class="calendar-date">';html+='<table class="table-condensed">';html+="<thead>";html+="<tr>";if(this.showWeekNumbers)html+="<th></th>";if(!minDate||minDate.isBefore(calendar[1][1])){html+='<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>'}else{html+="<th></th>"}var dateHtml=this.locale.monthNames[calendar[1][1].month()]+calendar[1][1].format(" YYYY");if(this.showDropdowns){dateHtml=this.renderDropdowns(calendar[1][1],minDate,maxDate)}html+='<th colspan="5" class="month">'+dateHtml+"</th>";if(!maxDate||maxDate.isAfter(calendar[1][1])){html+='<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>'}else{html+="<th></th>"}html+="</tr>";html+="<tr>";if(this.showWeekNumbers)html+='<th class="week">'+this.locale.weekLabel+"</th>";$.each(this.locale.daysOfWeek,function(index,dayOfWeek){html+="<th>"+dayOfWeek+"</th>"});html+="</tr>";html+="</thead>";html+="<tbody>";for(var row=0;row<6;row++){html+="<tr>";if(this.showWeekNumbers)html+='<td class="week">'+calendar[row][0].week()+"</td>";for(var col=0;col<7;col++){var cname="available ";cname+=calendar[row][col].month()==calendar[1][1].month()?"":"off";if(minDate&&calendar[row][col].isBefore(minDate,"day")||maxDate&&calendar[row][col].isAfter(maxDate,"day")){cname=" off disabled "}else if(calendar[row][col].format("YYYY-MM-DD")==selected.format("YYYY-MM-DD")){cname+=" active ";if(calendar[row][col].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")){cname+=" start-date "}if(calendar[row][col].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")){cname+=" end-date "}}else if(calendar[row][col]>=this.startDate&&calendar[row][col]<=this.endDate){cname+=" in-range ";if(calendar[row][col].isSame(this.startDate)){cname+=" start-date "}if(calendar[row][col].isSame(this.endDate)){cname+=" end-date "}}var title="r"+row+"c"+col;html+='<td class="'+cname.replace(/\s+/g," ").replace(/^\s?(.*?)\s?$/,"$1")+'" data-title="'+title+'">'+calendar[row][col].date()+"</td>"}html+="</tr>"}html+="</tbody>";html+="</table>";html+="</div>";var i;if(this.timePicker){html+='<div class="calendar-time">';html+='<select class="hourselect">';var start=0;var end=23;var selected_hour=selected.hour();if(this.timePicker12Hour){start=1;end=12;if(selected_hour>=12)selected_hour-=12;if(selected_hour===0)selected_hour=12}for(i=start;i<=end;i++){if(i==selected_hour){html+='<option value="'+i+'" selected="selected">'+i+"</option>"}else{html+='<option value="'+i+'">'+i+"</option>"}}html+="</select> : ";html+='<select class="minuteselect">';for(i=0;i<60;i+=this.timePickerIncrement){var num=i;if(num<10)num="0"+num;if(i==selected.minute()){html+='<option value="'+i+'" selected="selected">'+num+"</option>"}else{html+='<option value="'+i+'">'+num+"</option>"}}html+="</select> ";if(this.timePicker12Hour){html+='<select class="ampmselect">';if(selected.hour()>=12){html+='<option value="AM">AM</option><option value="PM" selected="selected">PM</option>'}else{html+='<option value="AM" selected="selected">AM</option><option value="PM">PM</option>'}html+="</select>"}html+="</div>"}return html},remove:function(){this.container.remove();this.element.off(".daterangepicker");this.element.removeData("daterangepicker")}};$.fn.daterangepicker=function(options,cb){this.each(function(){var el=$(this);if(el.data("daterangepicker"))el.data("daterangepicker").remove();el.data("daterangepicker",new DateRangePicker(el,options,cb))});return this}}(window.jQuery,window.moment);
/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2012 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: February 24, 2012
 * Version: 1.7.4
 */
(function(b){b.gritter={};b.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1000,time:6000};b.gritter.add=function(f){try{return a.add(f||{})}catch(d){var c="Gritter Error: "+d;(typeof(console)!="undefined"&&console.error)?console.error(c,f):alert(c)}};b.gritter.remove=function(d,c){a.removeSpecific(d,c||{})};b.gritter.removeAll=function(c){a.stop(c||{})};var a={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<div class="gritter-close"></div>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(g){if(typeof(g)=="string"){g={text:g}}if(g.text===null){throw'You must supply "text" parameter.'}if(!this._is_setup){this._runSetup()}var k=g.title,n=g.text,e=g.image||"",l=g.sticky||false,m=g.class_name||b.gritter.options.class_name,j=b.gritter.options.position,d=g.time||"";this._verifyWrapper();this._item_count++;var f=this._item_count,i=this._tpl_item;b(["before_open","after_open","before_close","after_close"]).each(function(p,q){a["_"+q+"_"+f]=(b.isFunction(g[q]))?g[q]:function(){}});this._custom_timer=0;if(d){this._custom_timer=d}var c=(e!="")?'<img src="'+e+'" class="gritter-image" />':"",h=(e!="")?"gritter-with-image":"gritter-without-image";if(k){k=this._str_replace("[[title]]",k,this._tpl_title)}else{k=""}i=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[k,n,this._tpl_close,c,this._item_count,h,m],i);if(this["_before_open_"+f]()===false){return false}b("#gritter-notice-wrapper").addClass(j).append(i);var o=b("#gritter-item-"+this._item_count);o.fadeIn(this.fade_in_speed,function(){a["_after_open_"+f](b(this))});if(!l){this._setFadeTimer(o,f)}b(o).bind("mouseenter mouseleave",function(p){if(p.type=="mouseenter"){if(!l){a._restoreItemIfFading(b(this),f)}}else{if(!l){a._setFadeTimer(b(this),f)}}a._hoverState(b(this),p.type)});b(o).find(".gritter-close").click(function(){a.removeSpecific(f,{},null,true)});return f},_countRemoveWrapper:function(c,d,f){d.remove();this["_after_close_"+c](d,f);if(b(".gritter-item-wrapper").length==0){b("#gritter-notice-wrapper").remove()}},_fade:function(g,d,j,f){var j=j||{},i=(typeof(j.fade)!="undefined")?j.fade:true,c=j.speed||this.fade_out_speed,h=f;this["_before_close_"+d](g,h);if(f){g.unbind("mouseenter mouseleave")}if(i){g.animate({opacity:0},c,function(){g.animate({height:0},300,function(){a._countRemoveWrapper(d,g,h)})})}else{this._countRemoveWrapper(d,g)}},_hoverState:function(d,c){if(c=="mouseenter"){d.addClass("hover");d.find(".gritter-close").show()}else{d.removeClass("hover");d.find(".gritter-close").hide()}},removeSpecific:function(c,g,f,d){if(!f){var f=b("#gritter-item-"+c)}this._fade(f,c,g||{},d)},_restoreItemIfFading:function(d,c){clearTimeout(this["_int_id_"+c]);d.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in b.gritter.options){this[opt]=b.gritter.options[opt]}this._is_setup=1},_setFadeTimer:function(f,d){var c=(this._custom_timer)?this._custom_timer:this.time;this["_int_id_"+d]=setTimeout(function(){a._fade(f,d)},c)},stop:function(e){var c=(b.isFunction(e.before_close))?e.before_close:function(){};var f=(b.isFunction(e.after_close))?e.after_close:function(){};var d=b("#gritter-notice-wrapper");c(d);d.fadeOut(function(){b(this).remove();f()})},_str_replace:function(v,e,o,n){var k=0,h=0,t="",m="",g=0,q=0,l=[].concat(v),c=[].concat(e),u=o,d=c instanceof Array,p=u instanceof Array;u=[].concat(u);if(n){this.window[n]=0}for(k=0,g=u.length;k<g;k++){if(u[k]===""){continue}for(h=0,q=l.length;h<q;h++){t=u[k]+"";m=d?(c[h]!==undefined?c[h]:""):c[0];u[k]=(t).split(l[h]).join(m);if(n&&u[k]!==t){this.window[n]+=(t.length-u[k].length)/l[h].length}}}return p?u:u[0]},_verifyWrapper:function(){if(b("#gritter-notice-wrapper").length==0){b("body").append(this._tpl_wrap)}}}})(jQuery);
/*
 * Fuel UX Spinner
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */
(function($,undefined){var old=$.fn.spinner;var Spinner=function(element,options){this.$element=$(element);this.options=$.extend({},$.fn.spinner.defaults,options);this.$input=this.$element.find(".spinner-input");this.$element.on("keyup",this.$input,$.proxy(this.change,this));this.$element.on("keydown",this.$input,$.proxy(this.keydown,this));if(this.options.hold){this.$element.on("mousedown",".spinner-up",$.proxy(function(){this.startSpin(true)},this));this.$element.on("mouseup",".spinner-up, .spinner-down",$.proxy(this.stopSpin,this));this.$element.on("mouseout",".spinner-up, .spinner-down",$.proxy(this.stopSpin,this));this.$element.on("mousedown",".spinner-down",$.proxy(function(){this.startSpin(false)},this))}else{this.$element.on("click",".spinner-up",$.proxy(function(){this.step(true)},this));this.$element.on("click",".spinner-down",$.proxy(function(){this.step(false)},this))}this.$element.find(".spinner-up, .spinner-down").attr("tabIndex",-1);this.switches={count:1,enabled:true};if(this.options.speed==="medium"){this.switches.speed=300}else if(this.options.speed==="fast"){this.switches.speed=100}else{this.switches.speed=500}this.lastValue=null;this.render();if(this.options.disabled){this.disable()}};Spinner.prototype={constructor:Spinner,render:function(){var inputValue=this.$input.val();if(inputValue){this.value(inputValue)}else{this.$input.val(this.options.value)}this.$input.attr("maxlength",(this.options.max+"").split("").length)},change:function(){var newVal=this.$input.val();if(newVal/1){this.options.value=newVal/1}else{newVal=newVal.replace(/[^0-9]/g,"")||"";this.$input.val(newVal);this.options.value=newVal/1}this.triggerChangedEvent()},stopSpin:function(){if(this.switches.timeout!==undefined){clearTimeout(this.switches.timeout);this.switches.count=1;this.triggerChangedEvent()}},triggerChangedEvent:function(){var currentValue=this.value();if(currentValue===this.lastValue)return;this.lastValue=currentValue;this.$element.trigger("changed",currentValue);this.$element.trigger("change")},startSpin:function(type){if(!this.options.disabled){var divisor=this.switches.count;if(divisor===1){this.step(type);divisor=1}else if(divisor<3){divisor=1.5}else if(divisor<8){divisor=2.5}else{divisor=4}this.switches.timeout=setTimeout($.proxy(function(){this.iterator(type)},this),this.switches.speed/divisor);this.switches.count++}},iterator:function(type){this.step(type);this.startSpin(type)},step:function(dir){var curValue=this.options.value;var limValue=dir?this.options.max:this.options.min;var digits,multiple;if(dir?curValue<limValue:curValue>limValue){var newVal=curValue+(dir?1:-1)*this.options.step;if(this.options.step%1!==0){digits=(this.options.step+"").split(".")[1].length;multiple=Math.pow(10,digits);newVal=Math.round(newVal*multiple)/multiple}if(dir?newVal>limValue:newVal<limValue){this.value(limValue)}else{this.value(newVal)}}else if(this.options.cycle){var cycleVal=dir?this.options.min:this.options.max;this.value(cycleVal)}},value:function(value){if(!isNaN(parseFloat(value))&&isFinite(value)){value=parseFloat(value);this.options.value=value;this.$input.val(value);return this}else{return this.options.value}},disable:function(){this.options.disabled=true;this.$input.attr("disabled","");this.$element.find("button").addClass("disabled")},enable:function(){this.options.disabled=false;this.$input.removeAttr("disabled");this.$element.find("button").removeClass("disabled")},keydown:function(event){var keyCode=event.keyCode;if(keyCode===38){this.step(true)}else if(keyCode===40){this.step(false)}}};$.fn.spinner=function(option){var args=Array.prototype.slice.call(arguments,1);var methodReturn;var $set=this.each(function(){var $this=$(this);var data=$this.data("spinner");var options=typeof option==="object"&&option;if(!data)$this.data("spinner",data=new Spinner(this,options));if(typeof option==="string")methodReturn=data[option].apply(data,args)});return methodReturn===undefined?$set:methodReturn};$.fn.spinner.defaults={value:1,min:1,max:999,step:1,hold:true,speed:"medium",disabled:false};$.fn.spinner.Constructor=Spinner;$.fn.spinner.noConflict=function(){$.fn.spinner=old;return this};$(function(){$("body").on("mousedown.spinner.data-api",".spinner",function(){var $this=$(this);if($this.data("spinner"))return;$this.spinner($this.data())})})})(window.jQuery);
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
(function(b){b.hotkeys={version:"0.8",specialKeys:{8:"backspace",9:"tab",10:"return",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",186:";",191:"/",220:"\\",222:"'",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":'"',",":"<",".":">","/":"?","\\":"|"}};function a(d){if(typeof d.data=="undefined"){return}if(typeof d.data==="string"){d.data={keys:d.data}}if(!d.data||!d.data.keys||typeof d.data.keys!=="string"){return}var c=d.handler,e=d.data.keys.toLowerCase().split(" "),f=["text","password","number","email","url","range","date","month","week","time","datetime","datetime-local","search","color","tel"];d.handler=function(k){if(this!==k.target&&(/textarea|select/i.test(k.target.nodeName)||b.inArray(k.target.type,f)>-1)){return}var h=b.hotkeys.specialKeys[k.keyCode],m=(k.type==="keydown"||k.type==="keypress")&&String.fromCharCode(k.which).toLowerCase();modif="",possible={};if(k.altKey&&h!=="alt"){modif+="alt+"}if(k.ctrlKey&&h!=="ctrl"){modif+="ctrl+"}if(k.metaKey&&!k.ctrlKey&&h!=="meta"){modif+="meta+"}if(k.shiftKey&&h!=="shift"){modif+="shift+"}if(h){possible[modif+h]=true}if(m){possible[modif+m]=true;possible[modif+b.hotkeys.shiftNums[m]]=true;if(modif==="shift+"){possible[b.hotkeys.shiftNums[m]]=true}}for(var j=0,g=e.length;j<g;j++){if(possible[e[j]]){return c.apply(this,arguments)}}}}b.each(["keydown","keyup","keypress"],function(){b.event.special[this]={add:a}})})(this.jQuery);
/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/
(function(b){var a=function(e){var c=b.Deferred(),d=new FileReader();d.onload=function(f){c.resolve(f.target.result)};d.onerror=c.reject;d.onprogress=c.notify;d.readAsDataURL(e);return c.promise()};b.fn.cleanHtml=function(){var c=b(this).html();return c&&c.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/,"")};b.fn.wysiwyg=function(k){var l=this,h,q,d,p=function(){if(q.activeToolbarClass){b(q.toolbarSelector).find(d).each(function(){try{var s=b(this).data(q.commandRole);if(document.queryCommandState(s)){b(this).addClass(q.activeToolbarClass)}else{b(this).removeClass(q.activeToolbarClass)}}catch(r){}})}},o=function(r,s){var u=r.split(" "),v=u.shift(),t=u.join(" ")+(s||"");document.execCommand(v,0,t);p()},f=function(r){b.each(r,function(s,t){l.keydown(s,function(u){if(l.attr("contenteditable")&&l.is(":visible")){u.preventDefault();u.stopPropagation();o(t)}}).keyup(s,function(u){if(l.attr("contenteditable")&&l.is(":visible")){u.preventDefault();u.stopPropagation()}})})},g=function(){try{var r=window.getSelection();if(r.getRangeAt&&r.rangeCount){return r.getRangeAt(0)}}catch(s){}},i=function(){h=g()},e=function(){try{var s=window.getSelection();if(h){try{s.removeAllRanges()}catch(r){document.body.createTextRange().select();document.selection.empty()}s.addRange(h)}}catch(t){}},j=function(r){l.focus();b.each(r,function(s,t){if(/^image\//.test(t.type)){b.when(a(t)).done(function(u){o("insertimage",u)}).fail(function(u){q.fileUploadError("file-reader",u)})}else{q.fileUploadError("unsupported-file-type",t.type)}})},c=function(s,r){e();if(document.queryCommandSupported("hiliteColor")){document.execCommand("hiliteColor",0,r||"transparent")}i();s.data(q.selectionMarker,r)},m=function(t,s){t.find(d).click(function(){e();l.focus();o(b(this).data(s.commandRole));i()});t.find("[data-toggle=dropdown]").click(e);var r=!!window.navigator.msPointerEnabled||(!!document.all&&!!document.addEventListener);t.find("input[type=text][data-"+s.commandRole+"]").on("webkitspeechchange change",function(){var u=this.value;this.value="";e();if(u){l.focus();o(b(this).data(s.commandRole),u)}i()}).on("focus",function(){if(r){return}var u=b(this);if(!u.data(s.selectionMarker)){c(u,s.selectionColor);u.focus()}}).on("blur",function(){if(r){return}var u=b(this);if(u.data(s.selectionMarker)){c(u,false)}});t.find("input[type=file][data-"+s.commandRole+"]").change(function(){e();if(this.type==="file"&&this.files&&this.files.length>0){j(this.files)}i();this.value=""})},n=function(){l.on("dragenter dragover",false).on("drop",function(s){var r=s.originalEvent.dataTransfer;s.stopPropagation();s.preventDefault();if(r&&r.files&&r.files.length>0){j(r.files)}})};q=b.extend({},b.fn.wysiwyg.defaults,k);d="a[data-"+q.commandRole+"],button[data-"+q.commandRole+"],input[type=button][data-"+q.commandRole+"]";f(q.hotKeys);if(q.dragAndDropImages){n()}m(b(q.toolbarSelector),q);l.attr("contenteditable",true).on("mouseup keyup mouseout",function(){i();p()});b(window).bind("touchend",function(u){var t=(l.is(u.target)||l.has(u.target).length>0),s=g(),r=s&&(s.startContainer===s.endContainer&&s.startOffset===s.endOffset);if(!r||t){i();p()}});return this};b.fn.wysiwyg.defaults={hotKeys:{"ctrl+b meta+b":"bold","ctrl+i meta+i":"italic","ctrl+u meta+u":"underline","ctrl+z meta+z":"undo","ctrl+y meta+y meta+shift+z":"redo","ctrl+l meta+l":"justifyleft","ctrl+r meta+r":"justifyright","ctrl+e meta+e":"justifycenter","ctrl+j meta+j":"justifyfull","shift+tab":"outdent",tab:"indent"},toolbarSelector:"[data-role=editor-toolbar]",commandRole:"edit",activeToolbarClass:"btn-info",selectionMarker:"edit-focus-marker",selectionColor:"darkgrey",dragAndDropImages:true,fileUploadError:function(d,c){console.log("File upload error",d,c)}}}(window.jQuery));
/*
Copyright 2014 Igor Vaynberg

Version: 3.5.1 Timestamp: Tue Jul 22 18:58:56 EDT 2014

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/
!function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function n(b){var c=a(document.createTextNode(""));b.before(c),c.before(b),c.remove()}function o(a){function b(a){return m[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function p(a,b){for(var c=0,d=b.length;d>c;c+=1)if(r(a,b[c]))return c;return-1}function q(){var b=a(l);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function r(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function s(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function t(a){return a.outerWidth(!1)-a.width()}function u(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function v(c){c.on("mousemove",function(c){var d=i;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function w(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function x(a,b){var c=w(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){p(a.target,b.get())>=0&&c(a)})}function y(a){a[0]!==document.activeElement&&window.setTimeout(function(){var d,b=a[0],c=a.val().length;a.focus();var e=b.offsetWidth>0||b.offsetHeight>0;e&&b===document.activeElement&&(b.setSelectionRange?b.setSelectionRange(c,c):b.createTextRange&&(d=b.createTextRange(),d.collapse(!1),d.select()))},0)}function z(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function A(a){a.preventDefault(),a.stopPropagation()}function B(a){a.preventDefault(),a.stopImmediatePropagation()}function C(b){if(!h){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);h=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),h.attr("class","select2-sizer"),a("body").append(h)}return h.text(b.val()),h.width()}function D(b,c,d){var e,g,f=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0===this.indexOf("select2-")&&f.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0!==this.indexOf("select2-")&&(g=d(this),g&&f.push(g))})),b.attr("class",f.join(" "))}function E(a,b,c,d){var e=o(a.toUpperCase()).indexOf(o(b.toUpperCase())),f=b.length;return 0>e?(c.push(d(a)),void 0):(c.push(d(a.substring(0,e))),c.push("<span class='select2-match'>"),c.push(d(a.substring(e,e+f))),c.push("</span>"),c.push(d(a.substring(e+f,a.length))),void 0)}function F(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function G(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&"function"==typeof e.abort&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page,i);i.callback(b)},error:function(a,b,c){var d={hasError:!0,jqXHR:a,textStatus:b,errorThrown:c};i.callback(d)}}),e=j.call(h,l)},f)}}function H(b){var d,e,c=b,f=function(a){return""+a.text};a.isArray(c)&&(e=c,c={results:e}),a.isFunction(c)===!1&&(e=c,c=function(){return e});var g=c();return g.text&&(f=g.text,a.isFunction(f)||(d=g.text,f=function(a){return a[d]})),function(b){var g,d=b.term,e={results:[]};return""===d?(b.callback(c()),void 0):(g=function(c,e){var h,i;if(c=c[0],c.children){h={};for(i in c)c.hasOwnProperty(i)&&(h[i]=c[i]);h.children=[],a(c.children).each2(function(a,b){g(b,h.children)}),(h.children.length||b.matcher(d,f(h),c))&&e.push(h)}else b.matcher(d,f(c),c)&&e.push(c)},a(c().results).each2(function(a,b){g(b,e.results)}),b.callback(e),void 0)}}function I(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]},h=d?c(e):c;a.isArray(h)&&(a(h).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g))}}function J(b,c){if(a.isFunction(b))return!0;if(!b)return!1;if("string"==typeof b)return!0;throw new Error(c+" must be a string, function, or falsy value")}function K(b,c){if(a.isFunction(b)){var d=Array.prototype.slice.call(arguments,2);return b.apply(c,d)}return b}function L(b){var c=0;return a.each(b,function(a,b){b.children?c+=L(b.children):c++}),c}function M(a,c,d,e){var h,i,j,k,l,f=a,g=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(i=-1,j=0,k=e.tokenSeparators.length;k>j&&(l=e.tokenSeparators[j],i=a.indexOf(l),!(i>=0));j++);if(0>i)break;if(h=a.substring(0,i),a=a.substring(i+l.length),h.length>0&&(h=e.createSearchChoice.call(this,h,c),h!==b&&null!==h&&e.id(h)!==b&&null!==e.id(h))){for(g=!1,j=0,k=c.length;k>j;j++)if(r(e.id(h),e.id(c[j]))){g=!0;break}g||d(h)}}return f!==a?a:void 0}function N(){var b=this;a.each(arguments,function(a,c){b[c].remove(),b[c]=null})}function O(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var c,d,e,f,g,h,j,k,i={x:0,y:0},c={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case c.LEFT:case c.RIGHT:case c.UP:case c.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case c.SHIFT:case c.CTRL:case c.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},l="<div class='select2-measure-scrollbar'></div>",m={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r","\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038a":"\u0399","\u03aa":"\u0399","\u038c":"\u039f","\u038e":"\u03a5","\u03ab":"\u03a5","\u038f":"\u03a9","\u03ac":"\u03b1","\u03ad":"\u03b5","\u03ae":"\u03b7","\u03af":"\u03b9","\u03ca":"\u03b9","\u0390":"\u03b9","\u03cc":"\u03bf","\u03cd":"\u03c5","\u03cb":"\u03c5","\u03b0":"\u03c5","\u03c9":"\u03c9","\u03c2":"\u03c3"};j=a(document),g=function(){var a=1;return function(){return a++}}(),d=O(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,f=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("select2-hidden-accessible").appendTo(document.body),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+g()),this.containerEventName=this.containerId.replace(/([.])/g,"_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.container.attr("title",c.element.attr("title")),this.body=a("body"),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(K(c.containerCss,this.opts.element)),this.container.addClass(K(c.containerCssClass,this.opts.element)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",A),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(c.dropdownCssClass,this.opts.element)),this.dropdown.data("select2",this),this.dropdown.on("click",A),this.results=d=this.container.find(f),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",A),v(this.results),this.dropdown.on("mousemove-filtered",f,this.bind(this.highlightUnderEvent)),this.dropdown.on("touchstart touchmove touchend",f,this.bind(function(a){this._touchEvent=!0,this.highlightUnderEvent(a)})),this.dropdown.on("touchmove",f,this.bind(this.touchMoved)),this.dropdown.on("touchstart touchend",f,this.bind(this.clearTouchMoved)),this.dropdown.on("click",this.bind(function(){this._touchEvent&&(this._touchEvent=!1,this.selectHighlighted())})),x(80,this.results),this.dropdown.on("scroll-debounced",f,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),A(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),A(a))}),u(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",f,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown touchstart touchend focusin",function(a){a.stopPropagation()}),this.nextSearchTerm=b,a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),k=k||q(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.search.attr("placeholder",c.searchInputPlaceholder)},destroy:function(){var a=this.opts.element,c=a.data("select2"),d=this;this.close(),a.length&&a[0].detachEvent&&a.each(function(){this.detachEvent("onpropertychange",d._sync)}),this.propertyObserver&&(this.propertyObserver.disconnect(),this.propertyObserver=null),this._sync=null,c!==b&&(c.container.remove(),c.liveRegion.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show()),N.call(this,"container","liveRegion","dropdown","results","search")},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:r(a.attr("locked"),"locked")||r(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,h,i=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var h,j=this.opts.id,k=this.liveRegion;h=function(d,e,l){var m,n,o,p,q,r,s,t,u,v;d=c.sortResults(d,e,f);var w=[];for(m=0,n=d.length;n>m;m+=1)o=d[m],q=o.disabled===!0,p=!q&&j(o)!==b,r=o.children&&o.children.length>0,s=a("<li></li>"),s.addClass("select2-results-dept-"+l),s.addClass("select2-result"),s.addClass(p?"select2-result-selectable":"select2-result-unselectable"),q&&s.addClass("select2-disabled"),r&&s.addClass("select2-result-with-children"),s.addClass(i.opts.formatResultCssClass(o)),s.attr("role","presentation"),t=a(document.createElement("div")),t.addClass("select2-result-label"),t.attr("id","select2-result-label-"+g()),t.attr("role","option"),v=c.formatResult(o,t,f,i.opts.escapeMarkup),v!==b&&(t.html(v),s.append(t)),r&&(u=a("<ul></ul>"),u.addClass("select2-result-sub"),h(o.children,u,l+1),s.append(u)),s.data("select2-data",o),w.push(s[0]);e.append(w),k.text(c.formatMatches(d.length))},h(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var f,g,h,c={results:[],more:!1},e=a.term;h=function(b,c){var d;b.is("option")?a.matcher(e,b.text(),b)&&c.push(i.optionToData(b)):b.is("optgroup")&&(d=i.optionToData(b),b.children().each2(function(a,b){h(b,d.children)}),d.children.length>0&&c.push(d))},f=d.children(),this.getPlaceholder()!==b&&f.length>0&&(g=this.getPlaceholderOption(),g&&(f=f.not(g))),f.each2(function(a,b){h(b,c.results)}),a.callback(c)}),c.id=function(a){return a.id}):"query"in c||("ajax"in c?(h=c.element.data("ajax-url"),h&&h.length>0&&(c.ajax.url=h),c.query=G.call(c.element,c.ajax)):"data"in c?c.query=H(c.data):"tags"in c&&(c.query=I(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(s(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return r(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");if("top"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.unshift(b)};else if("bottom"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.push(b)};else if("function"!=typeof c.createSearchChoicePosition)throw"invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";return c},monitorSource:function(){var d,c=this.opts.element,e=this;c.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),this._sync=this.bind(function(){var a=c.prop("disabled");a===b&&(a=!1),this.enable(!a);var d=c.prop("readonly");d===b&&(d=!1),this.readonly(d),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(K(this.opts.containerCssClass,this.opts.element)),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(this.opts.dropdownCssClass,this.opts.element))}),c.length&&c[0].attachEvent&&c.each(function(){this.attachEvent("onpropertychange",e._sync)}),d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,d!==b&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new d(function(b){a.each(b,e._sync)}),this.propertyObserver.observe(c.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b,choice:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){a===b&&(a=!1),this._readonly!==a&&(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface())},opened:function(){return this.container?this.container.hasClass("select2-dropdown-open"):!1},positionDropdown:function(){var t,u,v,w,x,b=this.dropdown,c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),g=a(window),h=g.width(),i=g.height(),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,o=l>=m+f,p=c.top-f>=g.scrollTop(),q=b.outerWidth(!1),r=j>=n+q,s=b.hasClass("select2-drop-above");s?(u=!0,!p&&o&&(v=!0,u=!1)):(u=!1,!o&&p&&(v=!0,u=!0)),v&&(b.hide(),c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,q=b.outerWidth(!1),r=j>=n+q,b.show(),this.focusSearch()),this.opts.dropdownAutoWidth?(x=a(".select2-results",b)[0],b.addClass("select2-drop-auto-width"),b.css("width",""),q=b.outerWidth(!1)+(x.scrollHeight===x.clientHeight?0:k.width),q>e?e=q:q=e,f=b.outerHeight(!1),r=j>=n+q):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body.css("position")&&(t=this.body.offset(),m-=t.top,n-=t.left),r||(n=c.left+this.container.outerWidth(!1)-q),w={left:n,width:e},u?(w.top=c.top-f,w.bottom="auto",this.container.addClass("select2-drop-above"),b.addClass("select2-drop-above")):(w.top=m,w.bottom="auto",this.container.removeClass("select2-drop-above"),b.removeClass("select2-drop-above")),w=a.extend(w,K(this.opts.dropdownCss,this.opts.element)),b.css(w)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),j.on("mousemove.select2Event",function(a){i.x=a.pageX,i.y=a.pageY}),!0):!1},opening:function(){var f,b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body.children().last()[0]&&this.dropdown.detach().appendTo(this.body),f=a("#select2-drop-mask"),0==f.length&&(f=a(document.createElement("div")),f.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),f.hide(),f.appendTo(this.body),f.on("mousedown touchstart click",function(b){n(f);var d,c=a("#select2-drop");c.length>0&&(d=c.data("select2"),d.opts.selectOnBlur&&d.selectHighlighted({noFocus:!0}),d.close(),b.preventDefault(),b.stopPropagation())})),this.dropdown.prev()[0]!==f[0]&&this.dropdown.before(f),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),f.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var g=this;this.container.parents().add(window).each(function(){a(this).on(d+" "+c+" "+e,function(){g.opened()&&g.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),j.off("mousemove.select2Event"),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return K(this.opts.maximumSelectionSize,this.opts.element)},ensureHighlightVisible:function(){var c,d,e,f,g,h,i,j,b=this.results;if(d=this.highlight(),!(0>d)){if(0==d)return b.scrollTop(0),void 0;c=this.findHighlightableChoices().find(".select2-result-label"),e=a(c[d]),j=(e.offset()||{}).top||0,f=j+e.outerHeight(!0),d===c.length-1&&(i=b.find("li.select2-more-results"),i.length>0&&(f=i.offset().top+i.outerHeight(!0))),g=b.offset().top+b.outerHeight(!0),f>g&&b.scrollTop(b.scrollTop()+(f-g)),h=j-b.offset().top,0>h&&"none"!=e.css("display")&&b.scrollTop(b.scrollTop()+h)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);
break}}},highlight:function(b){var d,e,c=this.findHighlightableChoices();return 0===arguments.length?p(c.filter(".select2-highlighted")[0],c.get()):(b>=c.length&&(b=c.length-1),0>b&&(b=0),this.removeHighlight(),d=a(c[b]),d.addClass("select2-highlighted"),this.search.attr("aria-activedescendant",d.find(".select2-result-label").attr("id")),this.ensureHighlightVisible(),this.liveRegion.text(d.text()),e=d.data("select2-data"),e&&this.opts.element.trigger({type:"select2-highlight",val:this.id(e),choice:e}),void 0)},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},touchMoved:function(){this._touchMoved=!0},clearTouchMoved:function(){this._touchMoved=!1},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var c,a=this.results,b=a.find("li.select2-more-results"),d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-a.height(),c<=this.opts.loadMorePadding&&(b.addClass("select2-active"),this.opts.query({element:this.opts.element,term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(c){e.opened()&&(e.opts.populateResults.call(this,a,c.results,{term:f,page:d,context:g}),e.postprocessResults(c,!1,!1),c.more===!0?(b.detach().appendTo(a).text(K(e.opts.formatLoadMore,e.opts.element,d+1)),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):b.remove(),e.positionDropdown(),e.resultsPage=d,e.context=c.context,this.opts.element.trigger({type:"select2-loaded",items:c}))})})))},tokenize:function(){},updateResults:function(c){function m(){d.removeClass("select2-active"),h.positionDropdown(),e.find(".select2-no-results,.select2-selection-limit,.select2-searching").length?h.liveRegion.text(e.text()):h.liveRegion.text(h.opts.formatMatches(e.find(".select2-result-selectable").length))}function n(a){e.html(a),m()}var g,i,l,d=this.search,e=this.results,f=this.opts,h=this,j=d.val(),k=a.data(this.container,"select2-last-term");if((c===!0||!k||!r(j,k))&&(a.data(this.container,"select2-last-term",j),c===!0||this.showSearchInput!==!1&&this.opened())){l=++this.queryCount;var o=this.getMaximumSelectionSize();if(o>=1&&(g=this.data(),a.isArray(g)&&g.length>=o&&J(f.formatSelectionTooBig,"formatSelectionTooBig")))return n("<li class='select2-selection-limit'>"+K(f.formatSelectionTooBig,f.element,o)+"</li>"),void 0;if(d.val().length<f.minimumInputLength)return J(f.formatInputTooShort,"formatInputTooShort")?n("<li class='select2-no-results'>"+K(f.formatInputTooShort,f.element,d.val(),f.minimumInputLength)+"</li>"):n(""),c&&this.showSearch&&this.showSearch(!0),void 0;if(f.maximumInputLength&&d.val().length>f.maximumInputLength)return J(f.formatInputTooLong,"formatInputTooLong")?n("<li class='select2-no-results'>"+K(f.formatInputTooLong,f.element,d.val(),f.maximumInputLength)+"</li>"):n(""),void 0;f.formatSearching&&0===this.findHighlightableChoices().length&&n("<li class='select2-searching'>"+K(f.formatSearching,f.element)+"</li>"),d.addClass("select2-active"),this.removeHighlight(),i=this.tokenize(),i!=b&&null!=i&&d.val(i),this.resultsPage=1,f.query({element:f.element,term:d.val(),page:this.resultsPage,context:null,matcher:f.matcher,callback:this.bind(function(g){var i;if(l==this.queryCount){if(!this.opened())return this.search.removeClass("select2-active"),void 0;if(g.hasError!==b&&J(f.formatAjaxError,"formatAjaxError"))return n("<li class='select2-ajax-error'>"+K(f.formatAjaxError,f.element,g.jqXHR,g.textStatus,g.errorThrown)+"</li>"),void 0;if(this.context=g.context===b?null:g.context,this.opts.createSearchChoice&&""!==d.val()&&(i=this.opts.createSearchChoice.call(h,d.val(),g.results),i!==b&&null!==i&&h.id(i)!==b&&null!==h.id(i)&&0===a(g.results).filter(function(){return r(h.id(this),h.id(i))}).length&&this.opts.createSearchChoicePosition(g.results,i)),0===g.results.length&&J(f.formatNoMatches,"formatNoMatches"))return n("<li class='select2-no-results'>"+K(f.formatNoMatches,f.element,d.val())+"</li>"),void 0;e.empty(),h.opts.populateResults.call(this,e,g.results,{term:d.val(),page:this.resultsPage,context:null}),g.more===!0&&J(f.formatLoadMore,"formatLoadMore")&&(e.append("<li class='select2-more-results'>"+f.escapeMarkup(K(f.formatLoadMore,f.element,this.resultsPage))+"</li>"),window.setTimeout(function(){h.loadMoreIfNeeded()},10)),this.postprocessResults(g,c),m(),this.opts.element.trigger({type:"select2-loaded",items:g})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){y(this.search)},selectHighlighted:function(a){if(this._touchMoved)return this.clearTouchMoved(),void 0;var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var c=this.select.children("option").first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&c||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.trim(c.text())&&""===c.val())return c}},initContainerWidth:function(){function c(){var c,d,e,f,g,h;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(h=d[f].replace(/\s/g,""),e=h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),e=O(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>","</a>","<label for='' class='select2-offscreen'></label>","<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <label for='' class='select2-offscreen'></label>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'","       aria-autocomplete='list' />","   </div>","   <ul class='select2-results' role='listbox'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.opts.shouldFocusInput(this)&&(this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e))),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),N.call(this,"selection","focusser")},initContainer:function(){var b,h,d=this.container,e=this.dropdown,f=g();this.opts.minimumResultsForSearch<0?this.showSearch(!1):this.showSearch(!0),this.selection=b=d.find(".select2-choice"),this.focusser=d.find(".select2-focusser"),b.find(".select2-chosen").attr("id","select2-chosen-"+f),this.focusser.attr("aria-labelledby","select2-chosen-"+f),this.results.attr("id","select2-results-"+f),this.search.attr("aria-owns","select2-results-"+f),this.focusser.attr("id","s2id_autogen"+f),h=a("label[for='"+this.opts.element.attr("id")+"']"),this.focusser.prev().text(h.text()).attr("for",this.focusser.attr("id"));var i=this.opts.element.attr("title");this.opts.element.attr("title",i||h.text()),this.focusser.attr("tabindex",this.elementTabIndex),this.search.attr("id",this.focusser.attr("id")+"_search"),this.search.prev().text(a("label[for='"+this.focusser.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&229!=a.keyCode){if(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)return A(a),void 0;switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),void 0;case c.ESC:return this.cancel(a),A(a),void 0}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body.get(0)&&window.setTimeout(this.bind(function(){this.opened()&&this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.ESC){if(this.opts.openOnEnter===!1&&a.which===c.ENTER)return A(a),void 0;if(a.which==c.DOWN||a.which==c.UP||a.which==c.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),A(a),void 0}return a.which==c.DELETE||a.which==c.BACKSPACE?(this.opts.allowClear&&this.clear(),A(a),void 0):void 0}})),u(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown touchstart","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),B(a),this.close(),this.selection.focus())})),b.on("mousedown touchstart",this.bind(function(c){n(b),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),A(c)})),e.on("mousedown touchstart",this.bind(function(){this.opts.shouldFocusInput(this)&&this.search.focus()})),b.on("focus",this.bind(function(a){A(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.setPlaceholder(),c.nextSearchTerm=c.opts.nextSearchTerm(a,c.search.val()))})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()===b?!1:(a=this.getPlaceholderOption())!==b&&a.prop("selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val()},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find("option").filter(function(){return this.selected&&!this.disabled});b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var g=r(e,b.id(d));return g&&(f=d),g},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return r(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&(b===!0&&d>=0?this.highlight(d):this.highlight(0)),b===!0){var g=this.opts.minimumResultsForSearch;g>=0&&this.showSearch(L(a.results)>=g)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||!this.opts.shouldFocusInput(this)||this.focusser.focus(),r(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var d,e,c=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),c.empty(),null!==a&&(d=this.opts.formatSelection(a,c,this.opts.escapeMarkup)),d!==b&&c.append(d),e=this.opts.formatSelectionCssClass(a,c),e!==b&&c.addClass(e),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find("option").filter(function(){return this.selected}).each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return this.clear(c),void 0;if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d),void 0)}}),f=O(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <label for='' class='select2-offscreen'></label>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find("option").filter(function(){return this.selected&&!this.disabled}).each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=s(c.val(),b.separator),f=[];b.query({matcher:function(c,d,g){var h=a.grep(e,function(a){return r(a,b.id(g))}).length;return h&&f.push(g),h},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var g=e[c],h=0;h<f.length;h++){var i=f[h];if(r(g,b.id(i))){a.push(i),f.splice(h,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),N.call(this,"searchContainer","selection")},initContainer:function(){var d,b=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=d=this.container.find(b);var e=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){e.search[0].focus(),e.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+g()),this.search.prev().text(a("label[for='"+this.opts.element.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.search.attr("placeholder")&&0==this.search.val().length||this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var b=d.find(".select2-search-choice-focus"),e=b.prev(".select2-search-choice:not(.select2-locked)"),f=b.next(".select2-search-choice:not(.select2-locked)"),g=z(this.search);if(b.length&&(a.which==c.LEFT||a.which==c.RIGHT||a.which==c.BACKSPACE||a.which==c.DELETE||a.which==c.ENTER)){var h=b;return a.which==c.LEFT&&e.length?h=e:a.which==c.RIGHT?h=f.length?f:null:a.which===c.BACKSPACE?this.unselect(b.first())&&(this.search.width(10),h=e.length?e:f):a.which==c.DELETE?this.unselect(b.first())&&(this.search.width(10),h=f.length?f:null):a.which==c.ENTER&&(h=null),this.selectChoice(h),A(a),h&&h.length||this.open(),void 0}if((a.which===c.BACKSPACE&&1==this.keydowns||a.which==c.LEFT)&&0==g.offset&&!g.length)return this.selectChoice(d.find(".select2-search-choice:not(.select2-locked)").last()),A(a),void 0;if(this.selectChoice(null),this.opened())switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),this.close(),void 0;case c.ESC:return this.cancel(a),A(a),void 0}if(a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.BACKSPACE&&a.which!==c.ESC){if(a.which===c.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)&&A(a),a.which===c.ENTER&&A(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",b,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",b,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.updateResults(!0),this.opts.shouldFocusInput(this)&&this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],e=this;a(b).each(function(){p(e.id(this),c)<0&&(c.push(e.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){e.addSelectedChoice(this)}),e.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,c){this.triggerSelect(a)&&""!==a.text&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.clearSearch(),this.updateResults(),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()?this.updateResults(!0):this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.updateResults(),this.search.select()),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),c&&c.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var j,k,d=!c.locked,e=a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),f=a("<li class='select2-search-choice select2-locked'><div></div></li>"),g=d?e:f,h=this.id(c),i=this.getVal();j=this.opts.formatSelection(c,g.find("div"),this.opts.escapeMarkup),j!=b&&g.find("div").replaceWith("<div>"+j+"</div>"),k=this.opts.formatSelectionCssClass(c,g.find("div")),k!=b&&g.addClass(k),d&&g.find(".select2-search-choice-close").on("mousedown",A).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),A(b),this.close(),this.focusSearch())})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),g.data("select2-data",c),g.insertBefore(this.searchContainer),i.push(h),this.setVal(i)},unselect:function(b){var d,e,c=this.getVal();if(b=b.closest(".select2-search-choice"),0===b.length)throw"Invalid argument: "+b+". Must be .select2-search-choice";if(d=b.data("select2-data")){var f=a.Event("select2-removing");if(f.val=this.id(d),f.choice=d,this.opts.element.trigger(f),f.isDefaultPrevented())return!1;for(;(e=p(this.id(d),c))>=0;)c.splice(e,1),this.setVal(c),this.select&&this.postprocessResults();return b.remove(),this.opts.element.trigger({type:"select2-removed",val:this.id(d),choice:d}),this.triggerChange({removed:d}),!0}},postprocessResults:function(a,b,c){var d=this.getVal(),e=this.results.find(".select2-result"),f=this.results.find(".select2-result-with-children"),g=this;e.each2(function(a,b){var c=g.id(b.data("select2-data"));p(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),f.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&g.highlight(0),!this.opts.createSearchChoice&&!e.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&J(g.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+K(g.opts.formatNoMatches,g.opts.element,g.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-t(this.search)},resizeSearch:function(){var a,b,c,d,e,f=t(this.search);a=C(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),s(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){p(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)r(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c>0&&c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),d&&this.triggerChange({added:this.data(),removed:e}),void 0;if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,f.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var e,f,d=this;return 0===arguments.length?this.selection.children(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(f=this.data(),b||(b=[]),e=a.map(b,function(a){return d.opts.id(a)}),this.setVal(e),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(f,this.data())),void 0)}}),a.fn.select2=function(){var d,e,f,g,h,c=Array.prototype.slice.call(arguments,0),i=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],j=["opened","isFocused","container","dropdown"],k=["val","data"],l={search:"externalSearch"};return this.each(function(){if(0===c.length||"object"==typeof c[0])d=0===c.length?{}:a.extend({},c[0]),d.element=a(this),"select"===d.element.get(0).tagName.toLowerCase()?h=d.element.prop("multiple"):(h=d.multiple||!1,"tags"in d&&(d.multiple=h=!0)),e=h?new window.Select2["class"].multi:new window.Select2["class"].single,e.init(d);else{if("string"!=typeof c[0])throw"Invalid arguments to select2 plugin: "+c;if(p(c[0],i)<0)throw"Unknown method: "+c[0];if(g=b,e=a(this).data("select2"),e===b)return;if(f=c[0],"container"===f?g=e.container:"dropdown"===f?g=e.dropdown:(l[f]&&(f=l[f]),g=e[f].apply(e,c.slice(1))),p(c[0],j)>=0||p(c[0],k)>=0&&1==c.length)return!1}}),g===b?this:g},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return E(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(a){return a.css},formatSelectionCssClass:function(){return b},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a==b?null:a.id},matcher:function(a,b){return o(""+b).toUpperCase().indexOf(o(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:M,escapeMarkup:F,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b},searchInputPlaceholder:"",createSearchChoicePosition:"top",shouldFocusInput:function(a){var b="ontouchstart"in window||navigator.msMaxTouchPoints>0;return b?a.opts.minimumResultsForSearch<0?!1:!0:!0}},a.fn.select2.locales=[],a.fn.select2.locales.en={formatMatches:function(a){return 1===a?"One result is available, press enter to select it.":a+" results are available, use up and down arrow keys to navigate."
},formatNoMatches:function(){return"No matches found"},formatAjaxError:function(){return"Loading failed"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" or more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results\u2026"},formatSearching:function(){return"Searching\u2026"}},a.extend(a.fn.select2.defaults,a.fn.select2.locales.en),a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:G,local:H,tags:I},util:{debounce:w,markMatch:E,escapeMarkup:F,stripDiacritics:o},"class":{"abstract":d,single:e,multi:f}}}}(jQuery);