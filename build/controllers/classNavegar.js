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
                                                 
                    let btnMenu2VendedorClientes = document.getElementById('btnMenu2VendedorClientes');
                    btnMenu2VendedorClientes.addEventListener('click',()=>{
                       
                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.inicioVendedorListado();

                    });

                    document.getElementById('btnMenuMostrarErrores').addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');
                        console.log('modalErrores')
                        $("#modalErrores").modal('show');
                    })

                    let btnMenu2VendedorClientesMapa = document.getElementById('btnMenu2VendedorClientesMapa');
                    btnMenu2VendedorClientesMapa.addEventListener('click',()=>{

                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.ventasMapaClientes();
                    });

             
             
                    let btnMenu2VendedorLogro = document.getElementById('btnMenu2VendedorLogro');
                    btnMenu2VendedorLogro.addEventListener('click',()=>{

                        $("#modalMenuPrincipal").modal('hide');
                        classNavegar.logrovendedor();
                    });

                 
                    //let btnMenu2Censo = document.getElementById('btnMenu2Censo');
                    //btnMenu2Censo.addEventListener('click',()=>{

                       // $("#modalMenuPrincipal").modal('hide');
                       // classNavegar.inicio_censo();

                    //});

                    //let btnMenu2VendedorSync = document.getElementById('btnMenu2VendedorSync');
                    //btnMenu2VendedorSync.addEventListener('click',()=>{

                        //$("#modalMenuPrincipal").modal('hide');
                        //$('#modalSync').modal('show');
                    //});


                    //let btnListaP = document.getElementById('btnListaP');
                    //btnListaP.addEventListener('click',()=>{

                       // $("#modalMenuPrincipal").modal('hide');
                        //$('#modalListaPrecios').modal('show');
                    //});

                    //boton de descargas

                    document.getElementById('btnDownloadProductos').addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');

                        funciones.Confirmacion('¿Está seguro que desea Descargar el catálogo de Productos?')
                        .then((value)=>{
                            if(value==true){
                    
                                setLog(`<label>Intentando conectarse y descargar los productos y precios</label>`,'rootWait')
                                $('#modalWait').modal('show');
                                
                                downloadProductos()
                                .then((data)=>{
                                    setLog(`<label>Productos descargados, guardándolos localmente</label>`,'rootWait')
                                    deleteProductos()
                                    .then(()=>{
                                        let contador = 1;
                                        let totalrows = Number(data.rowsAffected[0]);
                                          
                                        data.recordset.map(async(rows)=>{
                                            var datosdb = {
                                                CODSUCURSAL:rows.CODSUCURSAL,
                                                CODPROD:rows.CODPROD,
                                                DESPROD:rows.DESPROD,
                                                CODMEDIDA:rows.CODMEDIDA,
                                                EQUIVALE:rows.EQUIVALE,
                                                COSTO:rows.COSTO,
                                                PRECIO:rows.PRECIO,
                                                PRECIOA:rows.PRECIOA,
                                                PRECIOB:rows.PRECIOB,
                                                PRECIOC:rows.PRECIOC,
                                                DESMARCA:rows.DESMARCA,
                                                EXENTO:rows.EXENTO,
                                                EXISTENCIA:rows.EXISTENCIA,
                                                DESPROD3:rows.DESPROD3
                                            }                
                                            var noOfRowsInserted = await connection.insert({
                                                into: "productos",
                                                values: [datosdb], //you can insert multiple values at a time
                                            });
                                            if (noOfRowsInserted > 0) {
                                                let porc = (Number(contador) / Number(totalrows)) * 100;
                                                setLog(`<label>Productos agregados: ${contador} de ${totalrows} (${porc.toFixed(2)}%)</label>`,'rootWait')
                                                contador += 1;
                                                if(totalrows==contador){
                                                    $('#modalWait').modal('hide');
                                                    funciones.Aviso('Productos descargados exitosamente!!')
                                                }
                                            }
                                        });
                                    })
                                    .catch(()=>{
                                        //$('#modalWait').modal('hide');
                                        hideWaitForm();
                                       funciones.AvisoError('No se pudieron eliminar los productos previos')       
                                    })
                                })
                                .catch(()=>{
                                    console.log('no se descargó naa.')
                                    hideWaitForm();
                                    //$('#modalWait').modal('hide');
                                    funciones.AvisoError('No se pudieron descargar los productos')
                                })
                    
                                
                                
                            }
                        })
                    });
                    
                    document.getElementById('btnDownloadClientes').addEventListener('click',()=>{
                        $("#modalMenuPrincipal").modal('hide');

                        funciones.Confirmacion('¿Está seguro que desea Descargar el catálogo de Clientes?')
                        .then((value)=>{
                            if(value==true){
                    
                                setLog(`<label>Intentando descargar su lista de clientes</label>`,'rootWait')
                                $('#modalWait').modal('show');
                    
                                downloadClientes()
                                .then((data)=>{
                                    setLog(`<label>Clientes descargados, ahora se guardarán localmente</label>`,'rootWait')
                                    deleteClientes()
                                    .then(()=>{
                                        let totalrows = Number(data.rowsAffected[0]);
                                        let contador = 1;
                    
                                        data.recordset.map(async(rows)=>{
                                            var datosdb = {
                                                CODSUCURSAL:rows.CODSUCURSAL,
                                                CODIGO:rows.CODIGO,
                                                DESMUNI:rows.DESMUNI,
                                                DIRCLIE:rows.DIRCLIE,
                                                LASTSALE:rows.LASTSALE,
                                                LAT:rows.LAT,
                                                LONG:rows.LONG,
                                                NIT:rows.NIT,
                                                NOMCLIE:rows.NOMCLIE,
                                                REFERENCIA:rows.REFERENCIA,
                                                STVISITA:rows.STVISITA,
                                                VISITA:rows.VISITA,
                                                TELEFONO:rows.TELEFONO,
                                                TIPONEGOCIO:rows.TIPONEGOCIO,
                                                NEGOCIO:rows.NEGOCIO
                                            }                
                                            var noOfRowsInserted = await connection.insert({
                                                into: "clientes",
                                                values: [datosdb], //you can insert multiple values at a time
                                            });
                                            if (noOfRowsInserted > 0) {
                                                let porc = (Number(contador)/Number(totalrows))*100;
                                                setLog(`<label>Clientes agregados: ${contador} de ${totalrows} (${porc.toFixed(2)} %)</label>`,'rootWait')
                                                contador += 1;
                                                if(totalrows==contador){
                                                    hideWaitForm();
                                                    //$('#modalWait').modal('hide');
                                                    funciones.Aviso('Clientes descargados exitosamente!!')
                                                }
                                            }
                                        });
                                    })
                                    .catch(()=>{
                                        hideWaitForm();
                                        //$('#modalWait').modal('hide');
                                        funciones.AvisoError('No se pudieron eliminar los Clientes previos')
                                    })
                                })
                                .catch(()=>{
                                    hideWaitForm();
                                    //$('#modalWait').modal('hide');
                                    funciones.AvisoError('No se pudieron descargar los clientes')
                                })
                                      
                                
                            }
                        })
                    });

                    //boton de descargas
                 
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();

                    //classNavegar.ventasMapaClientes();
                    classNavegar.inicioVendedorListado();
                  
             
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