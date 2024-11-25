﻿import { _computingFeliciaLanguage as e } from "../helper/felicia.js"; export let _geojsonLayersGroup = []; let shapesRefract = [], __addPointToShapes = (e, o, a) => { null == o ? shapesRefract.push(new a.marker(e.coordinates, { opacity: 1 })) : shapesRefract.push(new a.CircleMarker(e.coordinates, o)) }, __addPointIconToShapes = (e, o, a) => { if (null == o) shapesRefract.push(new a.marker(e.coordinates, { opacity: 1 })); else { let l = new a.icon(o); shapesRefract.push(new a.marker(e.coordinates, { icon: l })) } }, __addPolylineToShapes = (e, o, a) => { null == o ? shapesRefract.push(new a.Polyline(e.coordinates, { opacity: 1 })) : shapesRefract.push(new a.Polyline(e.coordinates, o)) }, __addPolygonToShapes = (e, o, a) => { null == o ? shapesRefract.push(new a.polygon(e.coordinates, { opacity: 1 })) : shapesRefract.push(new a.polygon(e.coordinates, o)) }; export const _addFromGeoJSONObjectArray = (e, o, a, l, t) => { for (var i of e) { if (void 0 === i.type && !i.type instanceof String || "feature" !== i.type.toLowerCase() || void 0 === i.geometry) return; var n = i.geometry; if (void 0 === n.type && !n.type instanceof String) return; let s = null, r = void 0 === t ? null : void 0 === t.graphic ? null : t.graphic; null === r && (s = void 0 === t ? null : void 0 === t.icon ? null : t.icon); let p = null !== r ? r : s; "point" === n.type.toLowerCase() && void 0 === l ? ((null !== r || null === p) && (shapesRefract = [...shapesRefract, ..._addPoint(n, p, o, a)]), null !== s && (shapesRefract = [...shapesRefract, ..._addPointIcon(n, p, o, a)])) : "point" === n.type.toLowerCase() && void 0 !== l ? (null !== r && __addPointToShapes(n, p, a), null !== s && __addPointIconToShapes(n, p, a), null === p && (shapesRefract = _addPoint(n, p, o, a))) : "polyline" === n.type.toLowerCase() && void 0 === l ? shapesRefract = [...shapesRefract, ..._addPolyline(n, p, o, a)] : "polyline" === n.type.toLowerCase() && void 0 !== l ? __addPolylineToShapes(n, p, a) : "polygon" === n.type.toLowerCase() && void 0 === l ? shapesRefract = [...shapesRefract, ..._addPolygon(n, p, o, a)] : "polygon" === n.type.toLowerCase() && void 0 !== l && __addPolygonToShapes(n, r, a) } if (0 !== shapesRefract.length) { let d = a.layerGroup(shapesRefract); return d.addTo(o), d.type = l, _geojsonLayersGroup.push(d), { layer: d, name: l, shapes: [] } } }; export const _addFromGeoJSONObjectArrayOnSwitch = (e, o, a, l, t, i) => { let n = void 0 !== a.default ? a.default : null, s = a.cases, r = Object.groupBy(e, e => e.properties[a.fieldName]), p = Object.keys(r).map(e => ({ type: e, symbol: s.filter(o => -1 !== Object.keys(o).indexOf(e)).length > 0 ? s.filter(o => -1 !== Object.keys(o).indexOf(e))[0][e] : n, geometries: r[e] })); if (p.forEach(e => { let o = e.type, a = e.symbol, l = null, s = e.geometries; null !== e.symbol && "string" == typeof e.symbol.iconUrl && (l = e.symbol), null !== e.symbol && "string" == typeof e.symbol.radius && (a = e.symbol), a = null !== l ? null : a, s.forEach(e => { let s = e.geometry; "point" === s.type.toLowerCase() && void 0 === o ? (null !== a && (shapesRefract = [...shapesRefract, ..._addPoint(s, n, t, i)]), null !== l && (shapesRefract = [...shapesRefract, ..._addPointIcon(s, n, t, i)])) : "point" === s.type.toLowerCase() && void 0 !== o ? (null !== a && null === l && __addPointToShapes(s, a, i), null !== l && __addPointIconToShapes(s, l, i), null === a && null === l && (shapesRefract = _addPoint(s, n, t, i))) : "polyline" === s.type.toLowerCase() && void 0 === o ? shapesRefract = [...shapesRefract, ..._addPolyline(s, n, t, i)] : "polyline" === s.type.toLowerCase() && void 0 !== o ? __addPolylineToShapes(s, a, i) : "polygon" === s.type.toLowerCase() && void 0 === o ? shapesRefract = [...shapesRefract, ..._addPolygon(s, n, t, i)] : "polygon" === s.type.toLowerCase() && void 0 !== o && __addPolygonToShapes(s, a, i) }) }), 0 !== shapesRefract.length) { let d = i.layerGroup(shapesRefract); return d.addTo(t), d.type = o, _geojsonLayersGroup.push(d), { layer: d, name: o, shapes: shapesRefract } } }; export const _addFromGeoJSONObjectTooltipsFromArray = (o, a, l, t, i) => { let n = [0, 0], s = !0, r = 1; if (null == t || void 0 === t.content) return; void 0 !== t.offset && null !== t.offset && (n = t.offset), void 0 !== t.permanent && null !== t.permanent && (s = t.permanent), void 0 !== t.opacity && null !== t.opacity && (r = t.opacity); let p = []; for (let d of o) { if (void 0 === d.geometry || void 0 === d.geometry.coordinates) return; if ("point" === d.geometry.type.toLowerCase()) { let y = d.properties, c = e(y, t.content); var u = l.tooltip(d.geometry.coordinates, { content: c, offset: n, permanent: s, opacity: r }).addTo(a.layer); u.type = `tooltip_${i}`, p.push(u) } if ("polyline" === d.geometry.type.toLowerCase() || "polygon" === d.geometry.type.toLowerCase()) { let v = d.properties, f = e(v, t.content); var u = l.tooltip(l.polyline(d.geometry.coordinates).getBounds().getCenter(), { content: f, offset: n, permanent: s, opacity: r }).addTo(a.layer); u.type = `tooltip_${i}`, p.push(u) } } return { visibility: { type: `tooltip_${i}`, visibilityScales: t.visibilityZoomLevels }, tooltips: p } }; export const _addFromGeoJSON = (e, o, a) => _addFromGeoJSONObjectClass(e, o, a); export const _addFromGeoJSONString = (e, o, a) => { let l = null; try { l = JSON.parse(e) } catch (t) { console.error("Input file can't be parsed in JSON!"), console.error(t) } if (null !== l) return _addFromGeoJSONObjectClass(l, o, a) }; export const _addFromGeoJSONObjectClass = (e, o, a) => { let l = null, t = null, i = null, n = null, s = null; if (void 0 === e.name && !e.name instanceof String || void 0 === e.data && !e.data instanceof Array) return; void 0 !== e.symbology && null !== e.symbology && void 0 !== e.symbology.color && (l = e.symbology), void 0 !== e.appearance && null !== e.appearance && void 0 !== e.appearance.color && (l = e.appearance), void 0 !== e.symbology && null !== e.symbology && void 0 !== e.symbology.iconUrl && (t = e.symbology), void 0 !== e.appearance && null !== e.appearance && void 0 !== e.appearance.iconUrl && (t = e.appearance), void 0 !== e.symbology && null !== e.symbology && void 0 !== e.symbology.switch && (i = e.symbology.switch), void 0 !== e.appearance && null !== e.appearance && void 0 !== e.appearance.switch && (i = e.appearance.switch), void 0 !== e.symbology && null !== e.symbology && void 0 !== e.symbology.visibilityZoomLevels && (n = e.symbology.visibilityZoomLevels), void 0 !== e.appearance && null !== e.appearance && void 0 !== e.appearance.visibilityZoomLevels && (n = e.appearance.visibilityZoomLevels), void 0 !== e.tooltip && null !== e.tooltip && (s = e.tooltip), null === s && void 0 !== e.appearance && null !== e.appearance && void 0 !== e.appearance.tooltip && (s = e.appearance.tooltip); let r = e.data, p = e.name, d = { layer: null, name: "", shapes: [] }; null === i && (d = _addFromGeoJSONObjectArray(r, o, a, p, { graphic: l, icon: t })); let y = { visibility: { type: "", visibilityScales: {} }, tooltips: !1 }; y = _addFromGeoJSONObjectTooltipsFromArray(r, d, a, s, p), null !== i && (d = _addFromGeoJSONObjectArrayOnSwitch(r, e.name, i, n, o, a)); let c = [], u = []; null !== l && (c = void 0 !== d ? [d.layer] : [], u = void 0 !== l.visibilityZoomLevels && null !== l.visibilityZoomLevels ? [{ visibilityScales: l.visibilityZoomLevels, type: p }] : []), null !== t && (c = void 0 !== d ? [d.layer] : [], u = void 0 !== t.visibilityZoomLevels && null !== t.visibilityZoomLevels ? [{ visibilityScales: t.visibilityZoomLevels, type: p }] : []), null !== i && (c = void 0 !== d ? [d.layer] : [], u = null === n ? [] : [{ type: p, visibilityScales: n }]); let v = void 0 !== y && void 0 !== y.tooltips && null !== y.tooltip ? y.tooltips : [], f = void 0 !== y && void 0 !== y.visibility && null !== y.visibility ? [y.visibility] : [], h = [...c, ...v], m = [...u, ...f], $ = { layer: null, name: null }; return null != d && ($ = { layer: d.layer, name: d.name }), { overlay: $, settings: { shapes: h, visibility: m } } }; let _addPoint = (e, o, a, l) => { let t = []; if (void 0 !== e.coordinates || !(!e.coordinates instanceof Array)) { if (null === o) { var i = new l.marker(e.coordinates, { opacity: 1 }); t.push(i), i.addTo(a) } else { var i = l.circleMarker(e.coordinates, o); t.push(i), i.addTo(a) } return t } }, _addPointIcon = (e, o, a, l) => { let t = []; if (void 0 !== e.coordinates || !(!e.coordinates instanceof Array)) { if (null === o) { var i = new l.marker(e.coordinates, { opacity: 1 }); t.push(i), i.addTo(a) } else { let n = new l.icon(o), s = new l.marker(e.coordinates, { icon: n }); t.push(s), s.addTo(a) } return t } }, _addPolyline = (e, o, a, l) => { let t = []; if (void 0 !== e.coordinates || !(!e.coordinates instanceof Array)) { if (null === o) { var i = new l.Polyline(e.coordinates, { opacity: 1 }); t.push(i), i.addTo(a) } else { var i = new l.Polyline(e.coordinates, o); t.push(i), i.addTo(a) } return t } }, _addPolygon = (e, o, a, l) => { let t = []; if (void 0 !== e.coordinates || !(!e.coordinates instanceof Array)) { if (null === o) { var i = new l.polygon(e.coordinates, { opacity: 1 }); t.push(i), i.addTo(a) } else { var i = new l.polygon(e.coordinates, o); t.push(i), i.addTo(a) } return t } };