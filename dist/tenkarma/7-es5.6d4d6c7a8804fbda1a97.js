(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{VaKH:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){return function(){}}(),o=u("pMnS"),i=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),c=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function s(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["cms works!"]))],null,null)}function a(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-cms",[],null,null,null,s,c)),t["\u0275did"](1,114688,null,0,i,[],null,null)],function(l,n){l(n,1,0)},null)}var r=t["\u0275ccf"]("app-cms",i,a,{},{},[]),d=function(){function l(l,n,u){this.router=l,this.route=n,this.mainService=u,this.cmsDetails={}}return l.prototype.ngOnInit=function(){var l=this;this.route.params.subscribe(function(n){l.getCmsDetails(n.id)})},l.prototype.getCmsDetails=function(l){var n=this;this.mainService.cmsDetails(l).subscribe(function(l){n.cmsDetails=l.result[0],console.log("Cms Details==>",n.cmsDetails)},function(l){console.log("Error Get Category",l)})},l}(),p=u("ZYCi"),m=u("Y+C6"),f=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"section",[["class","innerbanner"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,0,"img",[["alt",""],["src","assets/img/inner-banner.jpg"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,8,"section",[["class","innerbody"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,7,"div",[["class","container"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,5,"div",[["class","col-lg-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,4,"div",[["class","about-info"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"h2",[["class","about-title"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t["\u0275ted"](9,null,["",""])),(l()(),t["\u0275eld"](10,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,0,"div",[["class","clearfix"]],null,null,null,null,null))],null,function(l,n){var u=n.component;l(n,9,0,u.cmsDetails.page_title),l(n,10,0,u.cmsDetails.page_description)})}function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-details",[],null,null,null,v,f)),t["\u0275did"](1,114688,null,0,d,[p.n,p.a,m.a],null,null)],function(l,n){l(n,1,0)},null)}var C=t["\u0275ccf"]("app-details",d,g,{},{},[]),h=u("Ip0R"),b=function(){return function(){}}();u.d(n,"CmsModuleNgFactory",function(){return y});var y=t["\u0275cmf"](e,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,r,C]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,h.NgLocalization,h.NgLocaleLocalization,[t.LOCALE_ID,[2,h["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](1073742336,h.CommonModule,h.CommonModule,[]),t["\u0275mpd"](1073742336,p.r,p.r,[[2,p.w],[2,p.n]]),t["\u0275mpd"](1073742336,b,b,[]),t["\u0275mpd"](1073742336,e,e,[]),t["\u0275mpd"](1024,p.l,function(){return[[{path:"",component:i},{path:"details/:id",component:d}]]},[])])})}}]);