let classNavegar = {
    login : async(historial)=>{
        divUsuario.innerText = 'DESCONECTADO';
        lbTipo.innerText = "Inicie sesión";
        rootMenu.innerHTML = '';
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalPassUsuario = '';
        GlobalTipoUsuario ='';
        
            funciones.loadScript('../views/login/index.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();
                rootMenuFooter.innerHTML = '<b class="text-white"></b>';
                if(historial=='SI'){

                }else{
                    window.history.pushState({"page":0}, "login", GlobalUrl + '/login')
                }
                
            })
        
            
    },
    inicio : async(tipousuario)=>{
        divUsuario.innerText = GlobalUsuario;
        lbTipo.innerText = GlobalTipoUsuario;

        switch (tipousuario) {
            case 'VENDEDOR':
                classNavegar.inicioVendedor();
                break;
            default:
                funciones.AvisoError('Esta aplicación es solo para VENTAS');
                break;
        };
    },
    inicioProgramador: ()=>{
        funciones.loadScript('../views/programador.js','root')
        .then(async()=>{
            GlobalSelectedForm='DEVELOPER';
            InicializarVista();
        })
    },
    inicioVendedor : async ()=>{
        let strFooter =    `
                            <button class="btn btn-lg col-12 hidden"  id="btnMenu2VendedorClientesMapa">
                                <i class="fal fa-map"></i>
                                Mapa
                            </button>
                           
                            <br> 
                            <button class="btn  btn-lg col-12 shadow card-rounded hand"  id="btnMenu2VendedorClientes">
                                <i class="fal fa-shopping-cart"></i>
                                VENTAS
                            </button>
                            <hr class="solid">
                            <button class="btn  btn-lg col-12 shadow card-rounded" id="btnMenu2VendedorLogro">
                                <i class="fal fa-chart-pie"></i>
                                PEDIDOS LEVANTADOS
                            </button>
                           
                           
                            <hr class="solid">
                           
                            <button class="btn  btn-lg col-12 shadow card-rounded hand"  id="btnDownloadClientes">
                                <i class="fal fa-user"></i>
                                DESCARGA CLIENTES
                            </button>
                            <hr class="solid">

                            <button class="btn  btn-lg col-12 shadow card-rounded hand"  id="btnDownloadProductos">
                                <i class="fal fa-box"></i>
                                DESCARGA PRODUCTOS/PRECIOS
                            </button>   
                            
                          

                            <button class="btn btn-outline-danger btn-xl col-12 btn-circle shadow"  id="btnMenuMostrarErrores">
                                <i class="fal fa-comment"></i>
                            </button>                           
                            
                                                  
                            `

                    rootMenuFooter.innerHTML = strFooter;
                                                 
                                  
                 
                    classNavegar.ventas('0','CONSUMIDOR FINAL','CIUDAD','CF');
             
    },
    inicioVendedorListado :async ()=>{
        funciones.loadScript('../views/vendedor/clientes.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            InicializarVista();
            window.history.pushState({"page":1}, "clientes", '/clientes');
        })
    },
    inicio_censo :async ()=>{
        funciones.loadScript('../views/vendedor/censo.js','root')
        .then(async()=>{
            GlobalSelectedForm='INICIO';
            InicializarVista();
            window.history.pushState({"page":5}, "censo", '/censo');
        })
    },
    ventas: async(nit,nombre,direccion,nitdoc)=>{
        
            funciones.loadScript('./views/vendedor/facturacion.js','root')
            .then(()=>{
                GlobalSelectedForm ='VENTAS';
                iniciarVistaVentas(nit,nombre,direccion,nitdoc);
                window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
            })
          
    },
    vendedorCenso: async()=>{
        
        funciones.loadScript('./views/vendedor/censo.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORCENSO';
            iniciarVistaVendedorCenso();
        })
      
    },
    ventasMapaClientes: async(historial)=>{
        funciones.loadScript('./views/vendedor/mapaclientes.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORMAPACLIENTES';
            iniciarVistaVendedorMapaClientes();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":3}, "mapaclientes", GlobalUrl + '/mapaclientes')
            }
        })
    },
    pedidos: async (historial)=>{
        funciones.loadScript('../views/pedidos/vendedor.js','root')
        .then(()=>{
            GlobalSelectedForm='PEDIDOS';
            inicializarVistaPedidos();
            if(historial=='SI'){

            }else{
            window.history.pushState({"page":4}, "logro", GlobalUrl + '/logro')
            }
        })             
    },
    logrovendedor: (historial)=>{
        funciones.loadScript('../views/vendedor/vendedorlogro.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGROVENDEDOR';
                inicializarVistaLogro();
                if(historial=='SI'){

                }else{
                window.history.pushState({"page":5}, "logromes", GlobalUrl + '/logromes')
                }
        })
    },
    ConfigVendedor: ()=>{
        funciones.loadScript('../views/supervisor/config.js','root')
        .then(()=>{
            GlobalSelectedForm='CONFIG';
            initView();
        })
    },
    inicio_supervisor : async ()=>{
        let strFooter =    `<hr class="solid">
                            <button class="btn  btn-lg col-12 shadow card-rounded hand"  id="btnMenu2SuperMapa">
                                <i class="fal fa-shopping-cart"></i>
                                Mapa vendedores
                            </button>

                            <hr class="solid">
                            <button class="btn  btn-lg col-12 shadow card-rounded" id="btnMenu2SuperVentas">
                                <i class="fal fa-chart-pie"></i>
                                Reportes de Ventas
                            </button>
                                               
                            <hr class="solid">
                            <button class="btn  btn-lg col-12 shadow card-rounded hand"  id="btnMenu2SuperConfig">
                                <i class="fal fa-cog"></i>
                                Configuraciones Vendedor
                            </button>        
                            `

                    rootMenuFooter.innerHTML = strFooter;
                                                 
        
                    let btnMenu2SuperMapa = document.getElementById('btnMenu2SuperMapa');
                    btnMenu2SuperMapa.addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.supervisor_mapa();
                    });

                    let btnMenu2SuperVentas = document.getElementById('btnMenu2SuperVentas');
                    btnMenu2SuperVentas.addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.supervisor_ventas();
                    });

                    let btnMenu2SuperConfig = document.getElementById('btnMenu2SuperConfig');
                    btnMenu2SuperConfig.addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.ConfigVendedor();
                    });
                
                 
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    //actualiza las credenciales
                    updateDateDownload();

                    classNavegar.supervisor_ventas();             
             
    },
    supervisor_ventas:()=>{
        funciones.loadScript('./views/supervisor/ventas.js','root')
        .then(()=>{
            GlobalSelectedForm ='SUPERVISOR';
            initView();
            //window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
        })
    },
    supervisor_mapa:()=>{
        funciones.loadScript('./views/supervisor/mapa.js','root')
        .then(()=>{
            GlobalSelectedForm ='SUPERVISORMAPA';
            initView();
            //window.history.pushState({"page":2}, "facturacion", GlobalUrl + '/facturacion')
        })
    }
}