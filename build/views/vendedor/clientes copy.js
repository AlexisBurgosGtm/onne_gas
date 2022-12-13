function getView(){
    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 shadow bg-white card-rounded">
                  

                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="dias" role="tabpanel" aria-labelledby="dias-tab">

                            ${view.dias()}

                        </div>
                        <div class="tab-pane fade" id="clientes" role="tabpanel" aria-labelledby="clientes-tab">
                            ${view.tabsClientes()}
                        </div>

                        <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                                   
                          
                        </div>
                      
                    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-dias" data-toggle="tab" href="#dias" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-clientes" data-toggle="tab" href="#clientes" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li> 
                        <li class="nav-item">
                            <a class="nav-link negrita text-info" id="tab-home" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-edit"></i></a>
                        </li>
                                                    
                    </ul>

                </div>
               
            `
        },
        dias : ()=>{
            return `
                    <div class="card border-top-rounded">
                        <div class="card-header bg-white">
                            <h4 class="negrita" id="lbTotalDia">Seleccione Dia</h4>
                            <h4 class="negrita" id="">Seleccione Dia</h4>
                        </div>
                        <div class="card-body">
                            
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('LUNES')">
                                    <div class="card-body p-2 text-center">
                                        <h5>LUNES</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('MARTES')">
                                    <div class="card-body p-2 text-center">
                                        <h5>MARTES</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('MIERCOLES')">
                                    <div class="card-body p-2 text-center">
                                        <h5>MIERCOLES</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('JUEVES')">
                                    <div class="card-body p-2 text-center">
                                        <h5>JUEVES</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('VIERNES')">
                                    <div class="card-body p-2 text-center">
                                        <h5>VIERNES</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('SABADO')">
                                    <div class="card-body p-2 text-center">
                                        <h5>SABADO</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('DOMINGO')">
                                    <div class="card-body p-2 text-center">
                                        <h5>DOMINGO</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12" onclick="getListaClientes('OTROS')">
                                    <div class="card-body p-2 text-center">
                                        <h5>OTROS</h5>
                                    </div>
                                </div>
                            </div> 
                            <br>
                            <div class="row">
                                <div class="card card-rounded shadow hand col-12 border-info text-info" onclick="getListaClientes('AJENOS')">
                                    <div class="card-body p-2 text-center">
                                        <h5>BUSCAR CLIENTE</h5>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row hidden">
                                <div class="col-sm-12 col-md-3 col-lg-3 col-xl-3">   
                                    <select class="negrita form-control border-secondary border-top-0 border-right-0 border-left-0" id="cmbDiaVisita"></select>                                          
                                </div>
                            </div> 

                        </div>

                    </div>
            `
        },
        tabsClientes :()=>{
            return `
            <div class="panel-container show">
                <div class="panel-content bg-white">
                    <ul class="nav nav-pills nav-justified" role="tablist">
                        <li class="nav-item" id="btnTabNV"><a class="nav-link nav-link-custom" data-toggle="tab" href="#panelNoVisitados">No Visit</a></li>
                        <li class="nav-item" id="btnTabV"><a class="nav-link nav-link-custom " data-toggle="tab" href="#panelVisitados">Visitados</a></li>
                        <li class="nav-item hidden" id="btnTabAjenos"><a id="btnTabAjenos2" class="nav-link nav-link-custom active" data-toggle="tab" href="#panelAjenos">Ajenos</a></li>
                    </ul>
                    <div class="tab-content py-3">

                        <div class="tab-pane fade active show" id="panelNoVisitados" role="tabpanel">
                            <div class="table-responsive">
                                
                                <input type="text" id="txtFiltrarCliente" class="form-control border-secondary border-top-0 border-right-0 border-left-0" placeholder="Buscar en la lista...">

                                <table class="table table-responsive table-hover table-bordered col-12 p-0" id="tblLista">
                                    <thead class="bg-secondary text-white">
                                        <tr>
                                            <td class="negrita">Cliente <small class="text-secondary">---------</small>Dirección</td>
                                          
                                        </tr>
                                    </thead>
                                    <tbody id="tblClientes">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade" id="panelVisitados" role="tabpanel">
                            <div class="table-responsive">
                                <table class="table table-responsive table-striped table-hover table-bordered" id="tblLista">
                                    <thead class="bg-warning">
                                        <tr>
                                            <td class="negrita">Cliente / Dirección</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblClientesVisitados">

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div class="tab-pane fade" id="panelAjenos" role="tabpanel">
                            
                            <hr class="solid">
                            
                            <div class="form-group">
                                <label class="negrita">Búsqueda de Cliente:</label>
                                <div class="input-group">               
                            
                                    <input type="text" class="form-control border-info" id="txtClientesAjenosBuscar" placeholder="Escriba para buscar cliente...">    
                                    <div class="input-group-append">
                                        <button class="btn btn-md btn-icon btn-info btn-round" id="btnClientesAjenosBuscar">
                                            <i class="fal fa-search"></i>
                                        </button>    
                                    </div>
                                </div>                            
                            </div>

                            <div class="table-responsive">
                                <table class="table table-responsive table-striped table-hover table-bordered" id="">
                                    <thead class="bg-secondary text-white">
                                        <tr>
                                            <td class="negrita">Cliente    /    Dirección</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblClientesAjenos">

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="shortcut-menu align-left hidden">
                <button class="btn btn-secondary btn-circle btn-xl" id="btnAtrasClientes">
                    <i class="fal fa-arrow-left"></i>
                </button>
            </div>
            `
        },
        modalMenuCliente: ()=>{
            return `<div class="card">
                        <div class="card-header bg-trans-gradient text-white text-center">
                            <label id="lbNombreCliente"></label>
                        </div>
                        
                        <div class="card-body">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-2">
                                        <label>Código:<label>    
                                    </div>
                                    <div class="col-3">
                                        <input type="text" id="txtCodClie" class="form-control">    
                                    </div>
                                    <div class="col-3">
                                        <input type="text" id="txtNitClie" class="form-control">
                                    </div>
                                </div>      
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-2">
                                        <label>Dirección:<label>
                                    </div>
                                    <div class="col-9">
                                        <input type="text" id="txtDirClie" class="form-control">
                                    </div>
                                </div>                                
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-2">
                                        <label>Teléfono:<label>    
                                    </div>
                                    <div class="col-9">
                                        <input type="text" id="txtTelClie" class="form-control">
                                    </div>
                                </div>                               
                            </div>

                        </div>    
                        
                    </div>

                    <div class="col-10" align="right"> 
                                         
                        <div class="row">
                            <div class="col-6">
                                
                                <div class="card card-rounded shadow bg-warning text-white" id="btnTiendaCerrada">
                                    <div class="card-body">
                                        <button class="btn btn-xl btn-warning btn-rounded hand col-12">
                                            <i class="fal fa-credit-card-front"></i>
                                            TIENDA CERRADA
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div class="col-6">
                                    <div class="card card-rounded shadow bg-secondary text-white"  id="btnNoDinero">
                                        <div class="card-body">
                                            <button class="btn btn-xl btn-secondary btn-rounded hand col-12">
                                                <i class="fal fa-credit-card-front"></i>
                                                NO DINERO
                                            </button>
                                        </div>
                                    </div>

                               
                            </div>
                            
                        </div>
                        
                        <div class="row hidden">
                            <button class="btn btn-lg btn-success col-12" id="btnVenderCliente">
                                <i class="fal fa-tag"></i>
                                VENDER
                            </button>
                        </div>          

                        <hr class="solid">
                        <hr class="solid">
                        
                        <div class="row">
                            <button class="btn btn-lg btn-danger btn-round col-12" id="btnCerrarModalCliente">
                                <i class="fal fa-times"></i>
                                CANCELAR
                            </button>
                        </div> 

                    </div>
                            `
        },
        modalHistorialCliente: ()=>{
            return `
            <div class="modal fade modal-with-scroll" id="ModalHistorialCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <label class="modal-title text-danger h3" id="">Historial de Compras del Cliente</label>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i class="fal fa-times"></i></span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="table-reponsive">
                                <table class="table table-responsive table-hover table-striped table-bordered">
                                    <thead>
                                        <td>Fecha</td>
                                        <td>Producto</td>
                                        <td>Importe</td>
                                    </thead>
                                    <tbody id="tblHistorial"></tbody>
                                </table>
                            </div>
                        </div>

                    
                    </div>
                </div>
            </div>
            `
        },
        modalCambiarDatosCliente: ()=>{
            return `
            <div class="modal fade modal-with-scroll" id="ModalCambiarDatosCliente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                       
                        <div class="modal-body">

                            <h5 class="negrita text-info3" id="">Cambiar datos Cliente</h5>
                           
                            <div class="card card-rounded shadow border-info p-4" style="font-size:80%">
                                
                                <div class="form-group">
                                    <label class="negrita">NIT</label>
                                    <input type="text" id="txtEditNit" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label class="negrita">Tipo Negocio</label>
                                    <select class="form-control" id="cmbEditTipoNegocio"></select>
                                </div>
                                <div class="form-group">
                                    <label class="negrita">Nombre Negocio</label>
                                    <input type="text" id="txtEditNegocio" class="form-control">
                                </div>
                                
                                <div class="form-group">
                                    <label class="negrita">Nombre Cliente</label>
                                    <input type="text" id="txtEditNombre" class="form-control">
                                </div>

                                <div class="form-group">
                                    <label class="negrita">Dirección</label>
                                    <input type="text" id="txtEditDireccion" class="form-control">
                                </div>
                               
                                <div class="row">
                                    
                                    <div class="col-2">
                                        <button class="btn btn-md btn-danger btn-circle hand shadow" id="btnEditGps">
                                            <i class="fal fa-map"></i>
                                        </button>
                                    </div>

                                    <div class="col-5">
                                        <div class="form-group">
                                            <label>Latitud</label>
                                            <input type="number" id="txtEditLatitud" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-5">
                                        <div class="form-group">
                                            <label>Longitud</label>
                                            <input type="number" id="txtEditLongitud" class="form-control">
                                        </div>
                                    </div>

                                </div>

                                <hr class="solid">

                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-secondary btn-circle btn-xl hand shadow" data-dismiss="modal">
                                            <i class="fal fa-arrow-left"></i>
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-info btn-circle btn-xl hand shadow" id="btnEnviarCambiosCliente">
                                            <i class="fal fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>

                                <hr class="solid">


                            </div>
                        </div>

                    
                    </div>
                </div>
            </div>
            `
        },
        modalGps: ()=>{
            return `
            <div class="modal fade" id="ModalGps" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-right" role="document">
                    <div class="modal-content">
                       
                        <div class="modal-body">

                            <h5 class="negrita text-info3" id="">Cambiar ubicación Cliente</h5>
                           
                            <div class="card card-rounded shadow p-2" id="gpsMap">
                                
                               
                             

                           


                            </div>
                            
                            <hr class="solid">
                            
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-secondary btn-circle btn-xl hand shadow" data-dismiss="modal">
                                        <i class="fal fa-arrow-left"></i>
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-success btn-circle btn-xl hand shadow" id="btnAceptarNuevoGps">
                                        <i class="fal fa-check"></i>
                                    </button>
                                </div>
                            </div>

                        </div>

                    
                    </div>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.body() + view.modalHistorialCliente() + view.modalCambiarDatosCliente() +  view.modalGps();
    rootMenuLateral.innerHTML = view.modalMenuCliente();

};

function Lmap(lat,long){
                      
          var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          osm = L.tileLayer(osmUrl, {center: [lat, long],maxZoom: 20, attribution: osmAttrib});    
          map = L.map('mapcontainer').setView([lat, long], 18).addLayer(osm);

          L.marker([lat, long], {draggable:'true'})
            .addTo(map)
            .bindPopup(`Marque la nueva posición GPS del cliente`, {closeOnClick: false, autoClose: false})
            .openPopup()
            .on("dragend",function(e) {
                    this.openPopup();
                    var position = e.target._latlng;
               
                    GlobalSelectedLat = position.lat.toString();
                    GlobalSelectedLong = position.lng.toString();                  
            });
           
            return map;

};

function getMenuCliente(codigo,nombre,direccion,telefono,lat,long,nit){
    
    
    //map.remove()
    //map = Lmap(lat,long,nombre,telefono);

    document.getElementById('lbNombreCliente').innerHTML = nombre;
    document.getElementById('txtCodClie').value = codigo;
    document.getElementById('txtNitClie').value = nit;
    document.getElementById('txtDirClie').value = direccion;
    document.getElementById('txtTelClie').value = telefono;
    
    GlobalSelectedCodCliente = codigo;
    GlobalSelectedNomCliente = nombre;
    GlobalSelectedDirCliente = direccion;
    

    classNavegar.ventas(GlobalSelectedCodCliente,GlobalSelectedNomCliente,GlobalSelectedDirCliente,nit);

    //showMenuLateral('Opciones del Cliente');

};

function getMenuCliente2(codigo,nombre,direccion,telefono,lat,long,nit){
    
    
    //map.remove()
    //map = Lmap(lat,long,nombre,telefono);

    document.getElementById('lbNombreCliente').innerHTML = nombre;
    document.getElementById('txtCodClie').value = codigo;
    document.getElementById('txtNitClie').value = nit;
    document.getElementById('txtDirClie').value = direccion;
    document.getElementById('txtTelClie').value = telefono;
    
    GlobalSelectedCodCliente = codigo;
    GlobalSelectedNomCliente = nombre;
    GlobalSelectedDirCliente = direccion;
    

    //classNavegar.ventas(GlobalSelectedCodCliente,GlobalSelectedNomCliente,GlobalSelectedDirCliente);

    showMenuLateral('Opciones del Cliente');

};

function getEditCliente(codigo,nombre,direccion,telefono,lat,long,nit,tiponegocio,negocio){
    
    
    //map.remove()
    //map = Lmap(lat,long,nombre,telefono);

    document.getElementById('txtEditNit').value = nit;
    document.getElementById('txtEditNombre').value = nombre;
    document.getElementById('txtEditDireccion').value = direccion; 
    document.getElementById('txtEditLatitud').value = lat;
    document.getElementById('txtEditLongitud').value = long;
    document.getElementById('cmbEditTipoNegocio').value = tiponegocio;
    document.getElementById('txtEditNegocio').value = negocio;

    GlobalSelectedCodCliente = codigo;
    GlobalSelectedNomCliente = nombre;
    GlobalSelectedDirCliente = direccion;
    

    $("#ModalCambiarDatosCliente").modal('show');



};



async function getHistorialCliente(codigo,nit,nombre){
    
    await apigen.vendedorHistorialCliente(codigo,'tblHistorial');

    $('#ModalHistorialCliente').modal('show')

};


async function setRecordatorioVisita(codigo, nit, nombre, direccion){
    
    await funciones.hablar(`¿Quieres establecer el recordatorio de visita a ${nombre}`);
    
    let recordatorio = 'Retomar visita';

    funciones.Confirmacion(`¿Quieres establecer el recordatorio de visita a ${nombre}`)
    .then((value)=>{
        if (value==true){

            apigen.clientesSetReminder(codigo,nit,nombre,direccion,recordatorio,0,0,funciones.getFecha())
            .then(()=>{
                funciones.Aviso('Recordatorio establecido exitosamente');
            })
            .catch(()=>{
                funciones.AvisoError('No se pudo establecer el recordatorio');
            })
            //funciones.setReminder(`Visitar a ${nombre}, ubicado en ${direccion}`, 60);
            
        }
    })
    
};


async function addListeners(){

    document.getElementById('btnAtrasClientes').addEventListener('click',()=>{
        document.getElementById('tab-dias').click();
    });
    
    document.getElementById('cmbEditTipoNegocio').innerHTML = funciones.getComboTipoClientes();


    //handler del dia de la semana
    let cmbDiaVisita = document.getElementById('cmbDiaVisita');
    cmbDiaVisita.innerHTML = funciones.ComboSemana("LETRAS");
       
    cmbDiaVisita.addEventListener('change',async()=>{
        await apigen.clientesVendedor(GlobalCodSucursal,GlobalCodUsuario,cmbDiaVisita.value,'tblClientes','tblClientesVisitados')
    })
    
    let f = new Date();
    cmbDiaVisita.value = funciones.getDiaSemana(f.getDay());

    
    let btnCerrarModalCliente = document.getElementById('btnCerrarModalCliente');
    btnCerrarModalCliente.addEventListener('click',()=>{
        hideMenuLateral()
    });

    let btnTiendaCerrada = document.getElementById('btnTiendaCerrada');
    btnTiendaCerrada.addEventListener('click',()=>{
        funciones.Confirmacion('Se marcará este cliente como CERRADA. ¿Está seguro?')
        .then((value)=>{
            if(value==true){
                apigen.updateClientesLastSale(GlobalSelectedCodCliente,'CERRADO')
                .then(async()=>{
                    funciones.Aviso('TIENDA CERRADA');
                    await apigen.clientesVendedor(GlobalCodSucursal,GlobalCodUsuario,cmbDiaVisita.value,'tblClientes','tblClientesVisitados')
                })
                .catch(()=>{
                    funciones.AvisoError('No se marcar esta tienda. Inténtelo de nuevo')
                })
                
                hideMenuLateral();
            }
        })
        
        
    });

    let btnNoDinero = document.getElementById('btnNoDinero');
    btnNoDinero.addEventListener('click',()=>{
        funciones.Confirmacion('Se marcará este cliente como SIN DINERO. ¿Está seguro?')
        .then(async(value)=>{
            if(value==true){
                apigen.updateClientesLastSale(GlobalSelectedCodCliente,'NODINERO')
                .then(async()=>{
                    funciones.Aviso('TIENDA SIN DINERO');
                    await apigen.clientesVendedor(GlobalCodSucursal,GlobalCodUsuario,cmbDiaVisita.value,'tblClientes','tblClientesVisitados')
                })
                .catch(()=>{
                    funciones.AvisoError('No se marcar esta tienda. Inténtelo de nuevo')
                })

                hideMenuLateral();
            }
        })
        
        
    });


    let btnVenderCliente = document.getElementById('btnVenderCliente');
    btnVenderCliente.addEventListener('click',()=>{
        hideMenuLateral();
        classNavegar.ventas(GlobalSelectedCodCliente,GlobalSelectedNomCliente,GlobalSelectedDirCliente);
    });

    let txtFiltrarCliente = document.getElementById('txtFiltrarCliente');
    txtFiltrarCliente.addEventListener('keyup',(e)=>{
        funciones.FiltrarTabla('tblLista','txtFiltrarCliente');
    });

    await apigen.clientesVendedor(GlobalCodSucursal,GlobalCodUsuario,cmbDiaVisita.value,'tblClientes','tblClientesVisitados')

    document.getElementById('txtClientesAjenosBuscar').addEventListener('keyup',(e)=>{
      
        let filtro = document.getElementById('txtClientesAjenosBuscar');
        filtro.value = filtro.value.toUpperCase(); //cambia el valor de la búsqueda a mayúsculas

        let txtClientesAjenosBuscar = filtro.value;
        if(e.code=='Enter'){
                apigen.clientesAjenosVendedor(GlobalCodSucursal,txtClientesAjenosBuscar.value,'tblClientesAjenos')
        }
        if(e.code=='NumpadEnter'){
                apigen.clientesAjenosVendedor(GlobalCodSucursal,txtClientesAjenosBuscar.value,'tblClientesAjenos')
        }
    })

    let btnClientesAjenosBuscar = document.getElementById('btnClientesAjenosBuscar');
    btnClientesAjenosBuscar.addEventListener('click', async ()=>{
        
        let filtro = document.getElementById('txtClientesAjenosBuscar');
        filtro.value = filtro.value.toUpperCase(); //cambia el valor de la búsqueda a mayúsculas

        let txtClientesAjenosBuscar = filtro.value;
        await apigen.clientesAjenosVendedor(GlobalCodSucursal,txtClientesAjenosBuscar.value,'tblClientesAjenos')

    })
    
    await apigen.vendedorTotalDia(GlobalCodSucursal,GlobalCodUsuario,funciones.getFecha(),'lbTotalDia');

    //verifica si hay pedidos pendientes
    dbCargarPedidosPendientes();

    //BOTON PARA CAMBIAR GPS EN MODAL EDIT CLIENTE
    document.getElementById('btnEditGps').addEventListener('click',()=>{

        funciones.Confirmacion('¿Está seguro que desea SOLICITAR CAMBIOS de Datos de este Cliente?')
        .then(()=>{
            let latitud = document.getElementById('txtEditLatitud').value;
            let longitud = document.getElementById('txtEditLongitud').value;
            let nombre = document.getElementById('txtEditNombre').value;
    
            let container = document.getElementById('gpsMap');
            container.innerHTML = GlobalLoader;                 
            let tbl = `<div class="mapcontainer4" id="mapcontainer"></div>`;        
            container.innerHTML = tbl;
    
            var map;
            map = Lmap(Number(latitud), Number(longitud));
    
            setTimeout(function(){try { map.invalidateSize(); } catch (error) { }}, 500);            
              
            $("#ModalGps").modal('show');
        })
     

    });

    document.getElementById('btnAceptarNuevoGps').addEventListener('click',()=>{

        document.getElementById('txtEditLatitud').value = GlobalSelectedLat;
        document.getElementById('txtEditLongitud').value = GlobalSelectedLong;
        $("#ModalGps").modal('hide');

    });



    let btnEnviarCambiosCliente = document.getElementById('btnEnviarCambiosCliente');
    btnEnviarCambiosCliente.addEventListener('click',()=>{

        funciones.Confirmacion('¿Está seguro que desea Enviar esta solicitud de Cambio de Datos?')
        .then(()=>{

            btnEnviarCambiosCliente.disabled = true;
            btnEnviarCambiosCliente.innerHTML = '<i class="fal fa-paper-plane fa-spin"></i>';
            
            let nit = document.getElementById('txtEditNit').value || 'CF';
            let tiponegocio = document.getElementById('cmbEditTipoNegocio').value || 'OTROS';
            let negocio = document.getElementById('txtEditNegocio').value || 'SN';
            let nombre = document.getElementById('txtEditNombre').value || 'SN';
            let direccion = document.getElementById('txtEditDireccion').value || 'SN';
            let latitud = document.getElementById('txtEditLatitud').value || 0;
            let longitud = document.getElementById('txtEditLongitud').value || 0;

            if (negocio=='SN'){funciones.AvisoError('Escriba el nombre del negocio');return;}
            if (nombre=='SN'){funciones.AvisoError('Escriba el nombre del negocio');return;}


            send_solicitud_cliente(GlobalSelectedCodCliente,nit,tiponegocio,negocio,nombre,direccion,latitud,longitud)
            .then(()=>{
                funciones.Aviso('Solicitud enviada exitosamente!!');
                btnEnviarCambiosCliente.disabled = false;
                btnEnviarCambiosCliente.innerHTML = '<i class="fal fa-paper-plane"></i>';

                $("#ModalCambiarDatosCliente").modal('hide');
            })
            .catch(()=>{
                funciones.AvisoError('No se pudo enviar la solicitud');
                btnEnviarCambiosCliente.disabled = false;
                btnEnviarCambiosCliente.innerHTML = '<i class="fal fa-paper-plane"></i>';
            })

        });

    });

    getListaClientes('AJENOS');

    document.getElementById('btnPedidosPend').style ="visibility:visible";

    funciones.slideAnimationTabs();
    
};


function getListaClientes(nodia){

    if(nodia=='AJENOS'){
        //document.getElementById('btnTabAjenos').style = "visibility:hidden";
        document.getElementById('btnTabNV').style = "visibility:hidden";
        document.getElementById('btnTabV').style = "visibility:hidden";
        document.getElementById('btnTabAjenos2').click();
    }else{
        //document.getElementById('btnTabAjenos').style = "visibility:hidden";
        document.getElementById('btnTabNV').style = "visibility:visible";
        document.getElementById('btnTabV').style = "visibility:visible";
        document.getElementById('btnTabNV').click();
    }

    apigen.clientesVendedor(GlobalCodSucursal,GlobalCodUsuario,nodia,'tblClientes','tblClientesVisitados')
    document.getElementById('tab-clientes').click();

};


function inicializarVista(){
    getView();
    addListeners();
};


function send_solicitud_cliente(codclie,nitclie,tiponegocio,negocio,nomclie,dirclie,lat,long){
    
    return new Promise((resolve,reject)=>{
        axios.post('/clientes/solicitud_cambios_cliente',{
           sucursal: GlobalCodSucursal,
           codclie: codclie,
           nitclie: nitclie,
           tiponegocio: tiponegocio,
           negocio: negocio,
           nomclie: nomclie,
           dirclie: dirclie,
           lat: lat,
           long: long
        })
        .then((response) => {
            console.log(response);
            const data = response.data;
            if (data.rowsAffected[0]==0){
                reject();
            }else{
                resolve();
            }            
        }, (error) => {
            reject();
        });
    })

}