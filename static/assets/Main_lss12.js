import{X as de,r as p,_ as ue,aL as J,Y as Z,aM as me,u as Q,a as K,w as pe,B as P,H as re,aN as fe,x as ne,A as B,j as i,c,d as e,t as o,N as h,S as O,h as s,n as u,F as U,f as G,e as _,O as R,L as I,Z as se,T as A,W as oe,g as b,a0 as X,i as q,aO as ge,U as _e,V as be,o as ee,a1 as le,am as ve,aP as ye,ah as he,M as ae,R as $e,aQ as xe,aR as we,aa as ke,C as Ce,aS as Te,aT as Ie,aU as Ne,aV as Pe}from"./lss.js";const H=de("sellerRegistration",{state:()=>({registerTab:p(1),country:p(),home:p("https://liveshowseller.com"),terms:p("https://liveshowseller.com/terms-of-service/"),policy:p("https://liveshowseller.com/privacy-policy/"),notification:p(!1),alert:p(!1),registerInfo:p({}),vnBank:p({bankName:"VP Bank",accountName:"Tieu Thuy Tien",accountNumber:"47953",note:""}),g_cash:p({bankName:"GCash",accountName:"GCash",accountNumber:"0976 124 7562",note:""})})});const V=z=>(_e("data-v-d2b93db0"),z=z(),be(),z),Se={class:"flex-col flex gap-8"},De={class:"flex-col"},Ve={for:"",class:"subLabel"},Be=V(()=>e("span",{class:"text-danger"}," *",-1)),ze=["value"],qe={key:0,class:"text-danger text-[16px] leading-tight"},Re={class:"flex-col"},Ue={for:"",class:"subLabel"},Le=V(()=>e("span",{class:"text-danger"}," *",-1)),Me=["value"],Ee=["value"],je={key:0,class:"text-danger text-[16px] leading-tight"},Fe={class:"flex flex-row gap-8"},Oe={class:"flex-col w-1/2"},Ae={for:"firstName"},Ge=V(()=>e("span",{class:"text-danger"}," *",-1)),Qe={class:"flex-col w-1/2"},Ke={for:"lastName"},He=V(()=>e("span",{class:"text-danger"}," *",-1)),We={class:"flex flex-row gap-8"},Ye={class:"flex-col w-1/3"},Ze={class:"whitespace-nowrap"},Je={for:"",class:"subLabel"},Xe=V(()=>e("span",{class:"text-danger"}," *",-1)),et=["value"],tt={key:0,class:"text-danger text-[16px] leading-tight"},st={class:"flex-col w-2/3"},ot={for:"",class:"subLabel"},at=V(()=>e("span",{class:"text-danger"}," *",-1)),rt={key:0,class:"text-danger text-[16px] leading-tight"},nt={class:"flex-col"},lt={class:"subLabel"},it=V(()=>e("span",{class:"text-danger"}," *",-1)),ct={class:"relative"},dt={key:0,class:"text-danger text-[16px] leading-tight"},ut={class:"flex-col"},mt={for:"",class:"subLabel"},pt=V(()=>e("span",{class:"text-danger"}," *",-1)),ft={class:"relative"},gt=["type"],_t={key:0,class:"text-danger text-[16px] leading-tight"},bt={class:"flex-col"},vt={for:"",class:"subLabel"},yt=V(()=>e("span",{class:"text-danger"}," *",-1)),ht={class:"relative"},$t=["type"],xt={key:0,class:"text-danger text-[16px] leading-tight"},wt={class:"flex-col"},kt={for:"",class:"subLabel"},Ct=V(()=>e("span",{class:"text-danger"}," *",-1)),Tt=["value"],It=["value"],Nt={key:0,class:"text-danger text-[16px] leading-tight"},Pt={for:"",class:"subLabel text-danger"},St={key:0,class:"flex"},Dt={key:1,class:"flex-col"},Vt={class:"w-fit whitespace-nowrap"},Bt={key:2},zt={class:"flex"},qt=["href"],Rt=["href"],Ut={class:"flex justify-between my-10"},Lt=["href"],Mt={__name:"GetInfo",setup(z){const f=J(),m=H(),k=X().appContext.config.globalProperties.eventBus;Z(()=>{document.querySelector("body").setAttribute("style","padding-left: 0;")});const C=p({plans:"",price:""});Z(()=>{me($.query.country,f.alert).then(n=>{C.value=n.data})});const $=Q();K();const d=[{value:"month"},{value:"year"}],S=[{value:"Australia"},{value:"Cambodia"},{value:"Canada"},{value:"Hong Kong"},{value:"Indonesia"},{value:"Korea"},{value:"Malaysia"},{value:"Philippines"},{value:"Singapore"},{value:"Taiwan"},{value:"Thailand"},{value:"United States"},{value:"Vietnam"}],x=p(!1),g=p(!1),N=p(!1),T=p({firstName:"",lastName:"",plan:"",period:"",countryCode:"",contactNumber:"",email:"",password:"",confirmPassword:"",country:"",promoCode:"",intentSecret:"",privacyPolicy:"",is_welcome_gift_used:null,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone}),W=pe(()=>({firstName:{required:P},lastName:{required:P},plan:{required:P},period:{required:P},countryCode:{required:P},contactNumber:{required:P,integer:re},email:{required:P},password:{required:P},confirmPassword:{required:P,sameAs:fe(T.value.password)},country:{required:P},privacyPolicy:{required:P}})),r=ne(W,T),E=()=>{if(r.value.$touch(),r.value.$invalid){f.alert.showMessageToast(q.global.t("profile.invalid_data"));return}ge($.query.country,T.value).then(n=>{k.emit("showPaymentTab",{basicInfo:T.value,confirmInfo:n.data})}).catch(n=>{m.registerTab=1})};return(n,l)=>{const w=B("MailIcon"),j=B("EyeOffIcon"),F=B("EyeIcon");return i(),c("div",{class:u({hidden:s(m).registerTab!==1,block:s(m).registerTab===1})},[e("form",Se,[e("div",De,[e("label",Ve,o(n.$t("register.basic_info.plan")),1),Be,h(e("select",{class:u(["w-full form-select sm:form-select-lg rounded-lg",{"border-danger text-danger border-2":s(r).plan.$error}]),"onUpdate:modelValue":l[0]||(l[0]=t=>s(r).plan.$model=t)},[(i(!0),c(U,null,G(C.value.plans,(t,a)=>(i(),c(U,{key:a},[t.text!="Free Trial"?(i(),c("option",{key:0,value:t.value,class:"w-40"},o(n.$t("register.basic_info.plan_options."+t.value,{price:`${C.value.currency} ${t.price.month.toLocaleString("en-GB")}`})),9,ze)):_("",!0)],64))),128))],2),[[O,s(r).plan.$model]]),s(r).plan.$error?(i(),c("label",qe,o(n.$t("register.basic_info.required_field")),1)):_("",!0)]),e("div",Re,[e("label",Ue,o(n.$t("register.basic_info.period")),1),Le,h(e("select",{class:u(["w-full form-select sm:form-select-lg rounded-lg",{"border-danger text-danger border-2":s(r).period.$error}]),"onUpdate:modelValue":l[1]||(l[1]=t=>s(r).period.$model=t)},[(i(),c(U,null,G(d,(t,a)=>(i(),c(U,{key:a},[t.value=="year"&&s($).query.country=="TW"?(i(),c("option",{key:0,value:t.value,class:"w-40"},o(n.$t("register.basic_info.period_options.year_tw")),9,Me)):(i(),c("option",{key:1,value:t.value,class:"w-40"},o(n.$t("register.basic_info.period_options."+t.value)),9,Ee))],64))),64))],2),[[O,s(r).period.$model]]),s(r).period.$error?(i(),c("label",je,o(n.$t("register.basic_info.required_field")),1)):_("",!0)]),e("div",Fe,[e("div",Oe,[e("label",Ae,o(n.$t("register.basic_info.first_name")),1),Ge,h(e("input",{class:"form-control","onUpdate:modelValue":l[2]||(l[2]=t=>s(r).firstName.$model=t)},null,512),[[R,s(r).firstName.$model]])]),e("div",Qe,[e("label",Ke,o(n.$t("register.basic_info.last_name")),1),He,h(e("input",{class:"form-control","onUpdate:modelValue":l[3]||(l[3]=t=>s(r).lastName.$model=t)},null,512),[[R,s(r).lastName.$model]])])]),e("div",We,[e("div",Ye,[e("div",Ze,[e("label",Je,o(n.$t("register.basic_info.country_code")),1),Xe]),h(e("select",{class:u(["w-full form-select sm:form-select-lg rounded-lg",{"border-danger text-danger border-2":s(r).countryCode.$error}]),"onUpdate:modelValue":l[4]||(l[4]=t=>s(r).countryCode.$model=t)},[e("option",{value:s($).query.country,class:"w-40"},o(n.$t("register.basic_info.code_Options."+s($).query.country)),9,et)],2),[[O,s(r).countryCode.$model]]),s(r).countryCode.$error?(i(),c("label",tt,o(n.$t("register.basic_info.required_field")),1)):_("",!0)]),e("div",st,[e("label",ot,o(n.$t("register.basic_info.number")),1),at,h(e("input",{class:"form-control","onUpdate:modelValue":l[5]||(l[5]=t=>s(r).contactNumber.$model=t)},null,512),[[R,s(r).contactNumber.$model]]),s(r).contactNumber.$error?(i(),c("label",rt,o(n.$t("register.basic_info.required_field")),1)):_("",!0)])]),e("div",nt,[e("label",lt,o(n.$t("register.basic_info.email")),1),it,e("div",ct,[I(w,{class:"absolute w-6 h-6 top-2.5 left-3 z-10 text-slate-400"}),h(e("input",{type:"email",class:"iconInput form-control",placeholder:"Enter your e-mail","onUpdate:modelValue":l[6]||(l[6]=t=>s(r).email.$model=t)},null,512),[[R,s(r).email.$model]])]),s(r).email.$error?(i(),c("label",dt,o(n.$t("register.basic_info.required_field")),1)):_("",!0)]),e("div",ut,[e("label",mt,o(n.$t("register.basic_info.password")),1),pt,e("div",ft,[h(e("input",{class:"iconInput form-control","onUpdate:modelValue":l[7]||(l[7]=t=>s(r).password.$model=t),type:g.value?"text":"password"},null,8,gt),[[se,s(r).password.$model]]),g.value?(i(),A(j,{key:0,onClick:l[8]||(l[8]=t=>g.value=!g.value),class:"absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"})):(i(),A(F,{key:1,onClick:l[9]||(l[9]=t=>g.value=!g.value),class:"absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"}))]),s(r).password.$error?(i(),c("label",_t,o(n.$t("register.password_length")),1)):_("",!0)]),e("div",bt,[e("label",vt,o(n.$t("register.basic_info.confirm_password")),1),yt,e("div",ht,[h(e("input",{class:"iconInput form-control","onUpdate:modelValue":l[10]||(l[10]=t=>s(r).confirmPassword.$model=t),type:N.value?"text":"password"},null,8,$t),[[se,s(r).confirmPassword.$model]]),N.value?(i(),A(j,{key:0,onClick:l[11]||(l[11]=t=>N.value=!N.value),class:"absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"})):(i(),A(F,{key:1,onClick:l[12]||(l[12]=t=>N.value=!N.value),class:"absolute w-6 h-6 top-3 left-3 z-10 text-slate-400"}))]),s(r).confirmPassword.$error?(i(),c("label",xt,o(n.$t("register.basic_info.password_err")),1)):_("",!0)]),e("div",wt,[e("label",kt,o(n.$t("register.basic_info.target_country")),1),Ct,h(e("select",{class:u(["w-full form-select sm:form-select-lg rounded-lg",{"border-danger text-danger border-2":s(r).country.$error}]),"onUpdate:modelValue":l[13]||(l[13]=t=>s(r).country.$model=t)},[s($).query.country=="VN"?(i(),c("option",{key:0,value:s($).query.country,class:"w-40"},o(n.$t("register.basic_info.country_Options.Vietnam")),9,Tt)):(i(),c(U,{key:1},G(S,(t,a)=>e("option",{key:a,value:t.value,class:"w-40"},o(n.$t("register.basic_info.country_Options."+t.value)),9,It)),64))],2),[[O,s(r).country.$model]]),s(r).country.$error?(i(),c("label",Nt,o(n.$t("register.basic_info.required_field")),1)):_("",!0)]),e("label",Pt,o(n.$t("register.basic_info.welcome_gift")),1),T.value.plan=="standard"||T.value.plan=="premium"?(i(),c("div",St,[h(e("input",{class:"form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto",type:"checkbox","onUpdate:modelValue":l[14]||(l[14]=t=>x.value=t)},null,512),[[oe,x.value]]),e("label",null,o(n.$t("register.basic_info.promocode_question")),1)])):_("",!0),(T.value.plan=="standard"||T.value.plan=="premium")&&x.value?(i(),c("div",Dt,[e("label",Vt,o(n.$t("register.basic_info.promocode")),1),h(e("input",{type:"text",class:"form-control","onUpdate:modelValue":l[15]||(l[15]=t=>T.value.promoCode=t)},null,512),[[R,T.value.promoCode]])])):_("",!0),x.value?_("",!0):(i(),c("p",Bt,o(T.value.promoCode=""),1)),e("div",zt,[h(e("input",{type:"checkbox","onUpdate:modelValue":l[16]||(l[16]=t=>s(r).privacyPolicy.$model=t),class:"form-control form-check-input w-[1.2rem] h-[1.2rem] mr-3 my-auto"},null,512),[[oe,s(r).privacyPolicy.$model]]),e("label",{class:u({"text-danger font-blod":s(r).privacyPolicy.$error})},[b(o(n.$t("register.basic_info.policy.accept"))+" ",1),e("a",{class:u({"text-danger font-blod":s(r).privacyPolicy.$error}),href:s(m).terms},o(n.$t("register.basic_info.policy.terms")),11,qt),b(" "+o(n.$t("register.basic_info.policy.&"))+" ",1),e("a",{class:u({"text-danger font-blod":s(r).privacyPolicy.$error}),href:s(m).policy},o(n.$t("register.basic_info.policy.conditions")),11,Rt)],2)])]),e("div",Ut,[e("a",{class:"text-center btn btn-secondary",href:s(m).home},o(n.$t("register.basic_info.home")),9,Lt),e("button",{class:"btn btn-primary",onClick:l[17]||(l[17]=t=>E())},o(n.$t("register.basic_info.next")),1)])],2)}}};var Et=ue(Mt,[["__scopeId","data-v-d2b93db0"]]),jt="/assets/gCashQR_lss.jpeg",Ft="/assets/vn_bank_lss.png",Ot="/assets/ecpay_lss.png";const At={class:"p-3 mb-5 text-sm sm:text-lg flex-col"},Gt={class:"ml-3 font-medium text-[#660000]"},Qt={class:"ml-3 font-medium text-[#660000]"},Kt={class:"ml-3 font-medium text-[#660000]"},Ht=e("img",{src:xe,class:"flex w-[100px] lg:w-[200px] mb-5"},null,-1),Wt={key:0,class:"flex-none flex flex-wrap py-2 flex-row justify-around w-full"},Yt={class:"flex-1 text-center"},Zt={class:"flex-1 text-center"},Jt={key:1,class:"flex-none flex flex-wrap py-2 flex-row justify-around w-full"},Xt={class:"flex-1 text-center"},es={class:"flex-1 text-center"},ts={class:"tab-content tab-space py-10"},ss=Ne('<form id="payment-form"><div id="payment-element"></div><div id="message"></div><div id="error-message"></div><button id="submit" style="display:hidden;"></button></form>',1),os=[ss],as={class:"mx-auto text-xl font-medium"},rs={class:"mx-auto w-fit w-1/3 max-w-1/2"},ns={class:"whitespace-nowrap align-top text-slate-500"},ls={class:"text-right pl-10"},is={class:"whitespace-nowrap text-slate-500"},cs={class:"text-right pl-5"},ds={class:"whitespace-nowrap text-slate-500"},us={class:"text-right pl-10"},ms=["src"],ps={class:"text-lg font-medium"},fs={class:"text-gray-600"},gs=e("br",null,null,-1),_s={class:"text-gray-600"},bs={class:"flex flex-col my-3"},vs={for:"regular-form-2",class:"form-label"},ys={class:"mx-auto text-xl font-medium"},hs={class:"mx-auto w-fit w-1/3 max-w-1/2"},$s={class:"whitespace-nowrap align-top text-slate-500"},xs={class:"text-right pl-10"},ws={class:"whitespace-nowrap text-slate-500"},ks={class:"text-right pl-5"},Cs={class:"whitespace-nowrap text-slate-500"},Ts={class:"text-right pl-10"},Is=e("tr",null,[e("td",{colspan:2,class:"w-full pt-5"},[e("img",{src:jt,class:"w-60 mx-auto"})])],-1),Ns={class:"text-lg font-medium"},Ps={class:"text-gray-600"},Ss=e("br",null,null,-1),Ds={class:"text-gray-600"},Vs={class:"flex flex-col my-3"},Bs={for:"regular-form-2",class:"form-label"},zs=["src"],qs={class:"flex justify-between mt-10 text-sm lg:text-lg"},Rs={__name:"Payment",setup(z){const f=J(),m=H(),k=X().appContext.config.globalProperties.eventBus,C=Q();K(),p(!1);const $=p(!1),d=p(0),S=p({}),x=p({user_plan:"",period:"",payment_amount:""}),g=p(!0),N=t=>{d.value=t};ee(()=>{k.on("showPaymentTab",t=>{S.value=t.basicInfo,x.value=t.confirmInfo,S.value.intentSecret=x.value.client_secret,m.registerTab=2,W(x.value.client_secret)})}),le(()=>{k.off("showPaymentTab")});const T=()=>{g.value=!1,we(C.query.country,S.value).then(t=>{g.value=!0,k.emit("showComfirmRegisterTab",t.data)}).catch(t=>{g.value=!0,alert(t)})},W=t=>{const a=window.Stripe("pk_live_51J2aFmF3j9D00CA0vVODJGYyEw7oDyQ0a5RIVn4I5Bs7qZNGEu4e1e9hHbsaovbIT5DtBB87eQa2pKk0wyqWTAOj00OohKmna7"),v={clientSecret:t,appearance:{theme:"stripe"}},D=a.elements(v);D.create("payment").mount("#payment-element");const ie=document.getElementById("payment-form");$.value=!0,ie.addEventListener("submit",async ce=>{ce.preventDefault();const{error:te}=await a.confirmPayment({elements:D,redirect:"if_required"});if(te){const Y=document.querySelector("#error-message");Y.textContent=te.message}else a.retrievePaymentIntent(t).then(({paymentIntent:Y})=>{const M=document.querySelector("#message");switch(M.innerText="",Y.status){case"succeeded":T(),M.innerText=q.global.t("register.payment.stripe.stripe_success");break;case"processing":M.innerText=q.global.t("register.payment.stripe.stripe_process");break;case"requires_payment_method":M.innerText=q.global.t("register.payment.stripe.stripe_failed");break;default:M.innerText=q.global.t("register.payment.stripe.stripe_err");break}})})},r=()=>{document.getElementById("submit").click()},E=p(),n=ve({fiveDigits:""}),l={fiveDigits:{required:P,integer:re,minLength:ke(5),maxLength:Ce(5)}},w=ne(l,ye(n));he("bind[receiptUploadDropzoneRef]",t=>{E.value=t,t.dropzone.on("addedfile",a=>{const v=t.dropzone.getAcceptedFiles();v.length>0&&t.dropzone.removeFile(v[0])})});const j=()=>{let t=E.value.dropzone.getAcceptedFiles()[0];if(p(),[void 0,null,""].includes(t)){if(w.value.$touch(),w.value.$invalid){f.alert.showMessageToast(q.global.t("shopping_cart.invalid_data"));return}f.alert.showMessageToast(q.global.t("shopping_cart.invalid_data"));return}let a=new FormData;for(var v in S.value)a.append(v,S.value[v]);a.append("last_five_digit",n.fiveDigits),a.append("image",t||""),d.value===1?(a.append("account_name",m.vnBank.accountName),a.append("bank_name",m.vnBank.bankName)):d.value===2&&(a.append("account_name",m.g_cash.accountName),a.append("bank_name",m.g_cash.bankName)),g.value=!1,Te(C.query.country,a).then(D=>{g.value=!0,k.emit("showComfirmRegisterTab",D.data)}).catch(()=>{g.value=!0})},F=()=>{Ie(C.query.country,S.value).then(t=>{console.log(t);const a=document.createElement("form");a.setAttribute("id","data_set"),a.method="post",a.action=t.data.action;const v=t.data.data;for(const D in v)if(v.hasOwnProperty(D)){const y=document.createElement("input");y.type="hidden",y.name=D,y.value=v[D],a.appendChild(y)}document.body.appendChild(a),a.submit()})};return(t,a)=>{const v=B("font-awesome-icon"),D=B("Dropzone");return i(),c("div",{class:u([{hidden:s(m).registerTab!==2,block:s(m).registerTab===2},"flex-col"])},[e("div",At,[e("div",null,[b(o(t.$t("register.payment.selected_plan"))+" : ",1),e("span",Gt,o(t.$t("register.plan."+x.value.user_plan)),1)]),e("div",null,[b(o(t.$t("register.payment.payment_total"))+" : ",1),e("span",Qt,o(`${x.value.currency} ${x.value.payment_amount.toLocaleString("en-GB")}`),1)]),e("div",null,[b(o(t.$t("register.payment.period"))+" : ",1),e("span",Kt,o(t.$t("register.payment."+x.value.period)),1)])]),Ht,s(C).query.country=="VN"?(i(),c("ul",Wt,[e("li",Yt,[e("button",{onClick:a[0]||(a[0]=y=>N(0)),class:u([{"text-neutral-600 bg-white":d.value!==0,"text-white bg-primary":d.value===0},"sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full"])},[I(v,{icon:"fa-regular fa-credit-card",class:"h-6 mr-5"}),b(" "+o(t.$t("register.payment.payment_method.card")),1)],2)]),e("li",Zt,[e("button",{onClick:a[1]||(a[1]=y=>N(1)),class:u([{"text-neutral-600 bg-white":d.value!==1,"text-white bg-primary":d.value===1},"sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full"])},[I(v,{icon:"fa-solid fa-money-check-dollar",class:"h-7 mr-5"}),b(" "+o(t.$t("register.payment.payment_method.direct")),1)],2)])])):_("",!0),s(C).query.country=="PH"?(i(),c("ul",Jt,[e("li",Xt,[e("button",{onClick:a[2]||(a[2]=y=>N(0)),class:u([{"text-neutral-600 bg-white":d.value!==0,"text-white bg-primary":d.value===0},"sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full"])},[I(v,{icon:"fa-regular fa-credit-card",class:"h-6 mr-5"}),b(" "+o(t.$t("register.payment.payment_method.card")),1)],2)]),e("li",es,[e("button",{onClick:a[3]||(a[3]=y=>N(2)),class:u([{"text-neutral-600 bg-white":d.value!==2,"text-white bg-primary":d.value===2},"sm:w-[300px] py-2 mx-auto flex justify-center border-2 border-primary/30 btn h-full"])},[I(v,{icon:"fa-solid fa-money-check-dollar",class:"h-7 mr-5"}),b(" "+o(t.$t("register.payment.payment_method.direct")),1)],2)])])):_("",!0),e("div",ts,[e("div",{class:u([{hidden:d.value!==0,block:d.value===0},"my-5 lg:my-10"])},os,2),e("div",{class:u(["flex flex-col gap-3",{hidden:d.value!==1,block:d.value===1}])},[e("span",as,o(t.$t("register.payment.direct.payment_info")),1),e("table",rs,[e("tr",null,[e("td",ns,o(t.$t("register.payment.direct.bank_name")),1),b(),e("td",ls,o(s(m).vnBank.bankName),1)]),e("tr",null,[e("td",is,o(t.$t("register.payment.direct.account_name")),1),b(),e("td",cs,o(s(m).vnBank.accountName),1)]),e("tr",null,[e("td",ds,o(t.$t("register.payment.direct.account_number")),1),b(),e("td",us,o(s(m).vnBank.accountNumber),1)])]),e("img",{"data-action":"zoom",class:"w-60 mx-auto",src:s(Ft)},null,8,ms),I(D,{"ref-key":"receiptUploadDropzoneRef",options:{method:"put",url:"url",uploadMultiple:!1,maxFilesize:10,addRemoveLinks:!0,autoProcessQueue:!1,resizeQuality:.5,clickable:!0,acceptedFiles:"image/*"},class:"dropzone h-fit rounded-xl"},{default:ae(()=>[e("div",ps,o(t.$t("register.payment.direct.upload_img")),1),e("div",fs,[gs,b(o(t.$t("register.payment.direct.accepted_types"))+": jpeg, png, jpg ",1)]),e("div",_s,o(t.$t("register.payment.direct.max_size"))+" : 10MB",1)]),_:1}),e("div",bs,[e("label",vs,o(t.$t("register.payment.direct.last_five_digits")),1),h(e("input",{id:"regular-form-2",type:"number",class:u(["form-control",{"border-danger":s(w).fiveDigits.$error}]),"onUpdate:modelValue":a[4]||(a[4]=y=>s(w).fiveDigits.$model=y)},null,2),[[R,s(w).fiveDigits.$model,void 0,{trim:!0}]]),s(w).fiveDigits.$error?(i(),c("div",{key:0,class:u(["form-help",{"text-danger":s(w).fiveDigits.$error}])},o(t.$t("register.payment.direct.digits_message")),3)):_("",!0)])],2)]),e("div",{class:u(["flex flex-col gap-3",{hidden:d.value!==2,block:d.value===2}])},[e("span",ys,o(t.$t("register.payment.direct.payment_info")),1),e("table",hs,[e("tr",null,[e("td",$s,o(t.$t("register.payment.direct.bank_name")),1),b(),e("td",xs,o(s(m).g_cash.bankName),1)]),e("tr",null,[e("td",ws,o(t.$t("register.payment.direct.account_name")),1),b(),e("td",ks,o(s(m).g_cash.accountName),1)]),e("tr",null,[e("td",Cs,o(t.$t("register.payment.direct.account_number")),1),b(),e("td",Ts,o(s(m).g_cash.accountNumber),1)]),Is]),I(D,{"ref-key":"receiptUploadDropzoneRef",options:{method:"put",url:"url",uploadMultiple:!1,maxFilesize:10,addRemoveLinks:!0,autoProcessQueue:!1,resizeQuality:.5,clickable:!0,acceptedFiles:"image/*"},class:"dropzone h-fit rounded-xl"},{default:ae(()=>[e("div",Ns,o(t.$t("register.payment.direct.upload_img")),1),e("div",Ps,[Ss,b(o(t.$t("register.payment.direct.accepted_types"))+": jpeg, png, jpg ",1)]),e("div",Ds,o(t.$t("register.payment.direct.max_size"))+" : 10MB",1)]),_:1}),e("div",Vs,[e("label",Bs,o(t.$t("register.payment.direct.last_five_digits")),1),h(e("input",{id:"regular-form-2",type:"number",class:u(["form-control",{"border-danger":s(w).fiveDigits.$error}]),"onUpdate:modelValue":a[5]||(a[5]=y=>s(w).fiveDigits.$model=y)},null,2),[[R,s(w).fiveDigits.$model,void 0,{trim:!0}]]),s(w).fiveDigits.$error?(i(),c("div",{key:0,class:u(["form-help",{"text-danger":s(w).fiveDigits.$error}])},o(t.$t("register.payment.direct.digits_message")),3)):_("",!0)])],2),e("div",{class:u(["flex flex-col gap-3",{hidden:d.value!==3,block:d.value===3}])},[e("img",{class:"w-60 mx-auto",src:s(Ot),onClick:F},null,8,zs)],2),e("div",qs,[e("button",{class:"w-32 btn dark:border-darkmode-400",onClick:a[6]||(a[6]=y=>s(m).registerTab=1)},o(t.$t("register.payment.privious")),1),d.value==0&&g.value?h((i(),c("button",{key:0,class:"w-fit ml-5 shadow-md btn btn-primary",onClick:a[7]||(a[7]=y=>r())},o(t.$t("register.payment.confirm_payment")),513)),[[$e,$.value==!0]]):d.value==1||d.value==2?(i(),c("button",{key:1,type:"button",class:"w-fit ml-5 shadow-md btn btn-primary",onClick:a[8]||(a[8]=y=>j())},o(t.$t("register.payment.direct.complete_order")),1)):_("",!0)])],2)}}},Us={class:"px-3 text-xl font-medium"},Ls={class:"p-3 py-5 text-sm lg:text-lg flex-col"},Ms={key:0},Es={class:"ml-3 font-medium text-[#660000]"},js={key:1,class:"mt-10"},Fs={class:"flex flex-col font-medium text-center mt-10"},Os={__name:"Confirm",setup(z){J();const f=H();Q(),K();const L=X().appContext.config.globalProperties.eventBus,k=p({Customer:"",Email:"","Your Plan":"","Subscription Period":"","Subscription End Date":""});ee(()=>{L.on("showComfirmRegisterTab",d=>{k.value=d,f.registerTab=3,setTimeout(()=>window.location=`${$}/thank-you/`,1e4)})}),le(()=>{L.off("showComfirmRegisterTab")});const C=()=>{window.open(k.value.Receipt)},$="https://liveshowseller.com";return(d,S)=>(i(),c("div",{class:u(["confirmation",{hidden:s(f).registerTab!==3,block:s(f).registerTab===3}])},[e("span",Us,o(d.$t("register.confirm.succeeded")),1),e("div",Ls,[(i(!0),c(U,null,G(k.value,(x,g)=>(i(),c("div",{class:"flex-row",key:g},[g!=="Receipt"?(i(),c("div",Ms,[e("label",null,[b(o(d.$t("register.confirm."+g))+" : ",1),e("span",Es,o(x),1)])])):_("",!0),g==="Receipt"&&k.value.Receipt?(i(),c("div",js,[e("button",{class:"btn btn-warning text-white",onClick:S[0]||(S[0]=N=>C())},o(d.$t("register.confirm.download")),1)])):_("",!0)]))),128)),e("div",Fs,[e("div",null,o(d.$t("register.confirm.thankyou")),1)])])],2))}},As={class:"flex-col bg-white"},Gs={class:"flex-none flex flex-wrap ml-14 sm:ml-0 py-5 flex-row justify-around w-full"},Qs={class:"flex-1 text-center"},Ks={class:"intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10"},Hs={class:"flex-1 text-center"},Ws={class:"intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10"},Ys={class:"flex-1 text-center"},Zs={class:"intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10"},Js={class:"box p-8 sm:px-20 lg:py-10 shadow-sm rounded-lg sm:mx-20 text-sm sm:text-lg"},Xs={class:"tab-content tab-space"},to={__name:"Main",setup(z){const f=H();return Q(),K(),Z(()=>{document.querySelector("body").setAttribute("style","padding-left: 0;")}),ee(()=>{Pe("https://js.stripe.com/v3/",()=>{console.log("stripe SDK loaded")})}),(m,L)=>{const k=B("UserIcon"),C=B("CreditCardIcon"),$=B("CheckIcon");return i(),c("div",As,[e("ul",Gs,[e("li",Qs,[e("div",Ks,[e("button",{class:u([{"text-neutral-600 bg-white":s(f).registerTab!==1,"text-white bg-primary":s(f).registerTab===1},"w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto"])},[I(k)],2),e("div",{class:u(["w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400",{"text-neutral-600":s(f).registerTab!==1,"font-bold":s(f).registerTab===1}])},o(m.$t("register.tab.basic_info")),3)])]),e("li",Hs,[e("div",Ws,[e("button",{class:u([{"text-neutral-600 bg-white":s(f).registerTab!==2,"text-white bg-primary":s(f).registerTab===2},"w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto"])},[I(C,{paymentInfo:m.paymentInfo},null,8,["paymentInfo"])],2),e("div",{class:u(["w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400",{"text-neutral-600":s(f).registerTab!==2,"font-bold":s(f).registerTab===2}])},o(m.$t("register.tab.payment")),3)])]),e("li",Ys,[e("div",Zs,[e("button",{class:u([{"text-neutral-600 bg-white":s(f).registerTab!==3,"text-white bg-primary":s(f).registerTab===3},"w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 cursor-auto"])},[I($)],2),e("div",{class:u(["w-0 hidden lg:block lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400",{"text-neutral-600":s(f).registerTab!==3,"font-bold":s(f).registerTab===3}])},o(m.$t("register.tab.confirm")),3)])])]),e("div",Js,[e("div",Xs,[I(Et),I(Rs),I(Os)])])])}}};export{to as default};
