import { _computingFeliciaLanguage as e } from "../helper/felicia.js"; let renderingPointCollection = [], tooltipPointCollection = [], _renderType = "circleMarker", _classAppearanceSymbolsByAttributes = [], _classAppearanceTooltipsByAttributes = [], _defaultCircleMarker = { radius: 15, color: "#22ffff", weight: 4, fillColor: "#28ffff", opacity: .75 }; export const _initializationOfRendering = e => { _renderType = e }; export const _resetOfRendering = () => { _classAppearanceSymbolsByAttributes = [], _classAppearanceTooltipsByAttributes = [] }; export const _settingsOfRendering = (e, t) => { if (0 === e.length) return; let i = e.map(e => e.guid), o = _classAppearanceSymbolsByAttributes.filter(e => -1 === i.indexOf(e.guid)); _classAppearanceSymbolsByAttributes = [...o, ...e], renderingPointCollection.forEach(e => { let i = _classAppearanceSymbolsByAttributes.filter(t => t.guid === e.guid), o = renderingPointCollection.filter(t => t.guid === e.guid); if (0 !== o.length && 0 !== i.length) { if (void 0 !== i[0].symbol.iconUrl) { let n = t.icon(i[0].symbol), r = t.marker([e.latitude, e.longitude], { icon: n }); r.guid = e.guid, __changeToIconFromGroupLayerMethod(o, r) } else void 0 !== i[0].symbol.radius && o.map(n => { if (void 0 !== n.marker.options.radius) n.marker.setStyle(i[0].symbol); else { let r = new t.circleMarker([e.latitude, e.longitude], i[0].symbol); r.guid = e.guid, __changeToIconFromGroupLayerMethod(o, r) } }) } }); let n = _pointsLayersGroup.map(e => { let t = Object.values(e._layers), i = t.map(e => e.options); return { type: e.type, guids: t.map(e => e.guid), coordinates: t.map(e => [e._latlng.lat, e._latlng.lng]), symbol: 0 !== i.length && void 0 === i[0].icon ? i[0] : null, icon: 0 !== i.length ? void 0 === i[0].icon ? null : i[0].icon.options : null } }); return { points: _classAppearanceSymbolsByAttributes, symbols: n } }; let __replaceInToArrayPrototype = (e, t) => e.map(e => e.guid === t.guid ? t : e), __changeToIconFromGroupLayerMethod = (e, t) => { e.forEach(e => { _pointsLayersGroup.forEach(i => i.eachLayer(o => { o.guid === e.guid && (i.removeLayer(o), i.addLayer(t)) })), renderingPointCollection = renderingPointCollection.map(i => { if (e.guid !== i.guid) return i; { let o = i; return o.marker = t, o } }) }) }; export const _settingsOfTooltips = e => { let t = e.map(e => e.guid), i = _classAppearanceTooltipsByAttributes.filter(e => -1 === t.indexOf(e.guid)); _classAppearanceTooltipsByAttributes = [...i, ...e], __settingOrChangeTooltips() }; let __settingOrChangeTooltips = () => { _classAppearanceTooltipsByAttributes.forEach(t => { let i = renderingPointCollection.filter(e => e.guid == t.guid); if (1 === i.length) { let o = i[0], n = e(o, t.tooltip.content); t.tooltip.permanent ? o.marker.bindTooltip(n, { opacity: t.tooltip.opacity, permanent: t.tooltip.permanent }).openTooltip() : o.marker.bindTooltip(n, { opacity: t.tooltip.opacity, permanent: t.tooltip.permanent }) } }) }, __settingOrChangeTooltip = t => { _classAppearanceTooltipsByAttributes.filter(e => e.guid == t).forEach(i => { let o = renderingPointCollection.filter(e => e.guid === t); if (1 === o.length) { let n = o[0], r = e(n, i.tooltip.content); n.marker.setTooltipContent(r) } }) }; export const _emptyStreamPointCollection = () => { renderingPointCollection = [], tooltipPointCollection = [] }; export const _addPointToCollection = (e, t, i) => { if (!_pointValidateAndMessages(e)) return; let o = new i.marker([e.latitude, e.longitude], { opacity: 1 }), n = { guid: e.guid, marker: o, type: e.type, value: e.value, latitude: e.latitude, longitude: e.longitude }; renderingPointCollection.push(n), o.addTo(t) }; export let _pointsLayersGroup = []; export const _addPointsToCollection = (e, t, i, o) => { if (t && (renderingPointCollection = [], _pointsLayersGroup = []), !Array.isArray(e)) throw console.warm("is not Array points"), Error("is not Array points"); if (!_pointsValidateAndMessages(e)) throw console.warm("point(s) in Array is/are not valid"), Error("point(s) in Array is/are not valid"); let n = e.map(e => { let t = {}; if ("circleMarker" === _renderType) { let i = _classAppearanceSymbolsByAttributes.filter(t => t.guid === e.guid); (t = new o.circleMarker([e.latitude, e.longitude], 0 !== i.length ? i[0].symbol : _defaultCircleMarker)).guid = e.guid } else "marker" === _renderType && (t = new o.marker([e.latitude, e.longitude], { opacity: 1 })); return { guid: e.guid, marker: t, type: e.type, value: e.value, latitude: e.latitude, longitude: e.longitude, timestamp: new Date } }); renderingPointCollection = [...renderingPointCollection, ...n]; let r = o.layerGroup(n.map(e => e.marker)); return r.type = 0 !== n.length ? n[0].type : "not exist", _pointsLayersGroup.push(r), r.addTo(i), { layer: r, renderingPointCollection } }; export const _updateAttribute = (e, t, i) => { let o = renderingPointCollection.map(e => e.guid).indexOf(e.guid); if (-1 !== o) { if (renderingPointCollection[o].type !== e.type) { renderingPointCollection[o].timestamp = e.timestamp, renderingPointCollection[o].type = e.type, renderingPointCollection[o].value = e.value; let n = renderingPointCollection[o]; null != n && t.removeLayer(n.marker); let r = _pointsLayersGroup.filter(t => t.type === e.type); 0 !== r.length && r[0].addLayer(n.marker) } else renderingPointCollection[o].timestamp = e.timestamp, renderingPointCollection[o].type = e.type, renderingPointCollection[o].value = e.value; __settingOrChangeTooltip(e.guid) } }; export const _addPointsOnType = (e, t, i, o) => { if (t && (renderingPointCollection = [], _pointsLayersGroup = []), !Array.isArray(e)) throw console.warm("is not Array points"), Error("is not Array points"); if (!_pointsValidateAndMessages(e)) throw console.warm("point(s) in Array is/are not valid"), Error("point(s) in Array is/are not valid"); renderingPointCollection = [...renderingPointCollection, ...e.map(e => { let t = new o.marker([e.latitude, e.longitude], { opacity: 1 }); return { guid: e.guid, marker: t, type: e.type, value: e.value } })]; let n = o.layerGroup(renderingPointCollection.map(e => e.marker)); _pointsLayersGroup.push(n), n.addTo(i) }; export const _clearAllPointsCollection = e => { for (let t of _pointsLayersGroup) e.removeLayer(t); renderingPointCollection = [], tooltipPointCollection = [] }; export const _clearPointsByIdsCollection = (e, t) => { let i = renderingPointCollection.filter(t => -1 !== e.indexOf(t.guid)), o = renderingPointCollection.filter(t => -1 === e.indexOf(t.guid)); i.forEach(e => { t.removeLayer(e.marker) }), renderingPointCollection = o }; export const _removePoints = (e, t) => { }; export const _removeType = (e, t) => { }; export const _movePointFromCollection = (e, t, i) => { if (!_pointValidateAndMessages(e)) return; e.guid; let o = renderingPointCollection.filter(t => t.guid === e.guid); if (1 === o.length) { let n = o[0].marker, r = o[0].type, l = o[0].value; (e.type !== r || e.value !== l) && console.warn("You cannot change type and/or value using the moveTo method, sorry!"); var a = i.latLng(e.latitude, e.longitude); n.setLatLng(a), n.latitude = e.latitude, n.longitude = e.longitude, n.timestamp = new Date } else if (0 === o.length) throw console.warn("id(s) does not exist in the Geometric.Points collection"), Error("id(s) does not exist in the Geometric.Points collection"); else throw console.warn("Duplicated in the collection of points of Geometric.Points"), Error("Duplicated in the collection of points of Geometric.Points") }; let _pointValidateAndMessages = e => { let t = !0; if (null == e) throw console.warm("Point is not valid"), Error("Point is not valid"); if (void 0 === e.latitude || null === e.latitude) throw console.warm("latiude value is not valid"), Error("latiude value is not valid"); if (void 0 === e.longitude || null === e.longitude) throw console.warm("longitude value is not valid"), Error("longitude value is not valid"); if ("number" != typeof e.latitude || "number" != typeof e.longitude) throw console.warm("longitude and/or latitude value is not a number"), Error("longitude and/or latitude value is not a number"); return t }, _pointsValidateAndMessages = e => { let t = !0; for (let i of e) if (!_pointValidateAndMessages(i)) return !1; return t }; export function _asa_trebuie_facuta_scalarea_layerelor(e, t) { let i = 1e4, o = 0; if ("undefined" != typeof symbology && null !== symbology && void 0 !== symbology.scaling && null !== symbology.scaling) { let n = symbology.scaling; void 0 !== n.start_with && null !== n.start_with && (o = parseInt(n.start_with)), void 0 !== n.stop_with && null !== n.stop_with && (i = parseInt(n.stop_with)) } !1 == (0 === o && 1e4 === i) && t.on("zoomend", function () { parseInt(t.getZoom()) >= o && parseInt(t.getZoom()) <= i ? t.addLayer(layer) : t.removeLayer(layer) }) }