


//CENSO

let classDb = {
    SelectCenso: async (dia,codven,idContainer)=>{
        let contenedor = document.getElementById(idContainer);
        
        let tbl = `<div class="table-responsive col-12">
        <table class="table table-responsive table-hover table-striped">
            <thead class="bg-danger text-white">
                <tr>
                    <td>Código/NIT</td>
                    <td>Cliente/Dirección</td>
                    <td>Teléfono</td>
                </tr>
            </thead>
            <tbody id="tblListado">`;

        let tblfoot = `</tbody></table></div>`;

        let str = '';

            var response = await connection.select({
                from: "tempcenso",
                limit: 2000,
                Where: {
                    VISITA: dia,
                    CODVEN: Number(codven)
                }
               
            });    
            response.map((rows)=>{
                str +=  `
                <tr class="cursormano border-bottom">
                    <td>${rows.NITCLIE}
                        <br>
                        <small>Código: <b>${rows.ID}</b> </small>
                        <br>
                        <button class="btn btn-warning btn-sm btn-rounded" 
                            onclick="getDataCliente('${rows.ID}','${rows.NITCLIE}','${rows.TIPONEGOCIO}','${rows.NEGOCIO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.REFERENCIA}','${rows.CODMUNI}','${rows.CODDEPTO}','${rows.OBS}','${rows.CODVEN}','${rows.VISITA}','${rows.LAT}','${rows.LONG}','${rows.TELEFONO}','NO','${rows.SECTOR}')">
                            <i class="fal fa-edit"></i>Editar
                        </button>
                    </td>

                    <td>${rows.NOMCLIE}
                            <br>
                        <small><b>${rows.TIPONEGOCIO}-${rows.NEGOCIO}</b></small>
                            <br class="border-bottom">
                        <small>${rows.DIRCLIE},${rows.MUNICIPIO}</small>
                    </td>
                        <td>${rows.TELEFONO}
                        <br>
                        <button class="btn btn-success btn-sm btn-rounded" onclick="sendCliente(${rows.ID},'${rows.NITCLIE}','${rows.TIPONEGOCIO}','${rows.NEGOCIO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.REFERENCIA}','${rows.CODMUNI}','${rows.CODDEPTO}','${rows.OBS}','${rows.CODVEN}','${rows.VISITA}','${rows.LAT}','${rows.LONG}','${rows.TELEFONO}','${rows.FECHA}','${rows.SECTOR}')">
                            <i class="fal fa-paper-plane"></i>Enviar
                        </button>
                    </td>
                   
                </tr>`;
            })
            contenedor.innerHTML = tbl + str + tblfoot;
        
    },
    InsertCliente: (data)=>{  
        return new Promise((resolve,reject)=>{
            connection.insert({
                into: "tempcenso",
                values: [data], //you can insert multiple values at a time
            })
            .then(()=>{
                funciones.Aviso('Cliente registrado exitosamente');
                resolve();
            })
            .catch(()=>{
                funciones.AvisoError('No se puedo Guardar este Cliente, error de base de datos');
                reject();
            })
        }) 
        
        
    },
    EditCliente: async(data,id)=>{  
    
            var noOfRowsUpdated = await connection.update({ 
                in: "tempcenso",
                Set: data,
                Where: {
                    ID: Number(id)
                }
            });
            if (Number(noOfRowsUpdated) > 0) {
                funciones.Aviso('Cliente Actualizado Exitosamente');
                resolve();
            }else{
                reject();
            }
        
    },
    DeleteCliente: (id)=>{
        funciones.Confirmacion('¿Está seguro que desea ELIMINAR este cliente?')
            .then(async(value)=>{
                if(value==true){


                    var rowsDeleted = await connection.remove({
                        from: "censo",
                        where: {
                            ID: id
                        }
                    });
                    if(rowsDeleted>0){
                        document.getElementById(id).remove();
                        classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                        funciones.Aviso("Cliente eliminado con éxito");    
                    }else{
                        funciones.AvisoError('No se pudo eliminar')
                    }


                }
            })
    },
    DeleteClienteSilent: async(id)=>{
        
        var rowsDeleted = await connection.remove({
            from: "tempcenso",
            where: {
                ID: id
            }
        });
        if(rowsDeleted>0){
          
        }else{
           
        };

    
    }
}


//CENSO





//CREDENCIALES
function deleteDateDownload(){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "credenciales"
        });
        if(rowsDeleted>0){
            resolve();
        }else{
            resolve();
        }
    })            
};

function updateDateDownload() {
    let f = new Date();
    return new Promise((resolve,reject)=>{
        connection.insert({
            into: "credenciales",
            values: [{  DAYUPDATED:Number(f.getDate()),
                        USUARIO:GlobalUsuario,
                        CODSUCURSAL:GlobalCodSucursal
                    }] 
        })
        .then(()=>{
            GlobalSelectedDiaUpdated=Number(f.getDate());
            resolve();
        })
        .catch(()=>{
            GlobalSelectedDiaUpdated=0;
            reject();
        })
    }) 
};

function selectDateDownload() {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "credenciales",
            limit: 1,
           
        });
        response.map((r)=>{
            GlobalSelectedDiaUpdated = Number(r.DAYUPDATED);
            GlobalCodSucursal = r.CODSUCURSAL;
        })
        resolve(GlobalSelectedDiaUpdated)
    });
};


function downloadProductos (){

    return new Promise((resolve,reject)=>{

        axios.post('/ventas/buscarproductotodos', {sucursal:GlobalCodSucursal})  
        .then(async(response) => {
           
            const data = response.data;
            if(data.rowsAffected[0]==0){
                reject();
            }else{
                deleteDateDownload().then(()=>{updateDateDownload()})  
                resolve(data);                         
            }
        }, (error) => {
           reject();
        });

        
    })
  
 
   
};

function deleteProductos(){
    return new Promise((resolve,reject)=>{
        setLog(`<label class="text-danger">Eliminando productos...</label>`,'rootWait');
        let del = connection.clear('productos');
        if(del){
            resolve();
        }else{
            reject();
        }
    })            
};

function selectProducto(filtro) {

    return new Promise(async(resolve,reject)=>{
        let f = new Date();
        if(GlobalSelectedDiaUpdated.toString()==f.getDate().toString()){
            var response = await connection.select({
                from: "productos",
                limit: 50,
                where: {
                    CODPROD: filtro,
                    or: {
                        DESPROD: {
                            like: '%' + filtro + '%'
                        }   
                    }
                }
               
            });
            resolve(response)
        }else{
            reject('Debe actualizar su catálogo de productos...');
        }
        
    });
};

function downloadClientes (){
    return new Promise((resolve,reject)=>{

        axios.post('/clientes/listavendedortodos3', {
            sucursal: GlobalCodSucursal,
            codven:GlobalCodUsuario
        })  
        .then(async(response) => {
            const data = response.data;
            if(data.rowsAffected[0]==0){
                reject();
            }else{  
                resolve(data);
            }
        }, (error) => {
           reject();
        });

    })   
 
   
};

function deleteClientes(){
    return new Promise((resolve,reject)=>{
        setLog(`<label class="text-danger">Eliminando Clientes...</label>`,'rootWait');
        let del = connection.clear('clientes');
        if(del){
            resolve();
        }else{
            reject();
        }
    })            
};

function selectCliente(dia) {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "clientes",
            limit: 2000,
            where: {
                VISITA: dia
                }
           
        });
        resolve(response)
    });
};

async function updateSaleCliente(codigo) {

    var noOfRowsUpdated = await connection.update({ 
            in: "clientes",
          set: {
              LASTSALE:funciones.getFecha()
          },
          where: {
              CODIGO:codigo.toString()
          }
    });
    console.log('Cliente actualizado, rows: ' + noOfRowsUpdated.toString())

};

function insertTempVentas(datos){
    return new Promise((resolve,reject)=>{
        connection.insert({
            into: "tempventa",
            values: [datos], //you can insert multiple values at a time
        })
        .then(()=>{
            resolve();
        })
        .catch(()=>{
            reject();
        })
    }) 

};

function deleteItemVenta(id){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "tempventa",
            where: {
                ID: id
            }
        });
        if(rowsDeleted>0){resolve()}else{reject()}
    })            
};

function selectTempventas(usuario) {

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    USUARIO: usuario
                },
            order: { by: 'ID', type: 'asc' }
        });
        resolve(response)
    });
};

function selectDataRowVenta(id,nuevacantidad,nuevoprecio) {
    let costo = 0; let precio = 0; let equivale =0; let exento=0; let cantidad= nuevacantidad;
    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    ID: id
                }
        });
        response.map((rows)=>{
            costo = rows.COSTO;
            precio = nuevoprecio; //rows.PRECIO;
            equivale = rows.EQUIVALE;
            exento = rows.EXENTO;
        });
        let totalcosto = Number(costo) * Number(cantidad);
        let totalprecio = Number(precio) * Number(cantidad);
        let totalexento = Number(exento) * Number(cantidad);
        let totalunidades = Number(equivale) * Number(cantidad);
        //actualiza la fila
        let updatedrow = await connection.update({
            in: "tempventa",
            set: {
                CANTIDAD:Number(nuevacantidad),
                TOTALUNIDADES:totalunidades,
                TOTALCOSTO:totalcosto,
                PRECIO:nuevoprecio,
                TOTALPRECIO:totalprecio,
                EXENTO:totalexento
            },
            where: {
                ID: id
            }
        })
        if(updatedrow>0){
            resolve();
        }else{
            reject();
        }

    });
};


function gettempDocproductos(usuario){
    
    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            from: "tempventa",
            where: {
                    USUARIO: usuario
                },
            order: { by: 'ID', type: 'asc' }
        })
        if(Number(response.length)>0){
            resolve(response);
        }else{
            reject('No hay productos agregados');
        }
    })
    
};

function deleteTempVenta(usuario){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "tempventa"
        });
        if(rowsDeleted>0){resolve()}else{resolve()}
    })            
};


//PEDIDOS GUARDADOS EN EL CEL

//INSERTA LOCALMENTE UN PEDIDO
function insertVenta(datos){
    console.log('intentando ingresar en tabla documentos')
    return new Promise(async(resolve,reject)=>{
        var response = await connection.insert({
            into: "documentos",
            values: [datos], //you can insert multiple values at a time
        })
        if(response>0){resolve()}else{resolve()}
        
    }) 

};

function BACKUP_insertVenta(datos){
    console.log('intentando ingresar en tabla documentos')
    return new Promise((resolve,reject)=>{
        connection.insert({
            into: "documentos",
            values: [datos], //you can insert multiple values at a time
        })
        .then(()=>{
            resolve();
        })
        .catch(()=>{
            reject();
        })
    }) 

};

//carga el json con la lista de pedidos pendientes
function selectVentasPendientes(usuario) {
    
    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({

            from: "documentos",
            where: {
                    USUARIO: usuario
                },
            order: { by: 'ID', type: 'asc' }
        });
        resolve(response)
    });
};

//carga la lista de pedidos
function dbCargarPedidosPendientes(){
    
    selectVentasPendientes(GlobalUsuario)
    .then((response)=>{
        let container = document.getElementById('tblPedidosPendientes');
        container.innerHTML = GlobalLoader;

        let containerTotal = document.getElementById('lbTotalVentaPendiente');
        containerTotal.innerHTML = '--.--';

        let containerPeds = document.getElementById('lbTotalVentaPendientePeds');
        containerPeds.innerHTML = '--'
        
        let str = '';
        let contador = 0;
        let totalventa = 0;

        response.map((rs)=>{
            let btnPed = `btnE${rs.ID}`;
            contador = contador + 1;
            totalventa += Number(rs.TOTALPRECIO);
            str = str + `

                        <div class="card card-rounded shadow">
                            <div class="card-body">
                                <div class="form-group">
                                    <button class="btn btn-sm btn-danger shadow hand" onclick="dbDeletePedido('${rs.ID}');">
                                        <i class="fal fa-trash"></i>
                                    </button>
                                    <label class="negrita text-info">${rs.NOMCLIE}</label>
                                    <br>
                                    <small>${rs.DIRCLIE}</small>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Fecha</label>
                                            <br>
                                            ${rs.FECHA}
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label>Importe</label>
                                            <br>
                                            <label class="negrita text-danger">${funciones.setMoneda(rs.TOTALPRECIO,'Q')}</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <button class="btn btn-info btn-sm" onclick="getDbDetallePedido(${rs.ID},'${rs.NOMCLIE}');">
                                            <i class="fal fa-search"></i>Detalles
                                        </button>
                                    </div>
                                    <div class="col-6">
                                        <button class="btn btn-success btn-sm" id="${btnPed}" onclick="dbSendPedido(${rs.ID},'${btnPed}');">
                                            <i class="fal fa-paper-plane"></i>Enviar
                                        </button>
                                    </div>
                                </div>
                                <small>Gps:${rs.LAT},${rs.LONG}</small>
                            </div>
                        </div>
                        <hr class="solid">

                        `    
        })
        container.innerHTML = str;
        containerTotal.innerText = funciones.setMoneda(totalventa,'');
        containerPeds.innerHTML = contador;
        
        if(Number(contador)>0){
            btnPedidosPend.className = 'btn btn-danger btn-lg btn-icon rounded-circle shadow';
        }else{
            btnPedidosPend.className = 'btn btn-outline-secondary btn-lg btn-icon rounded-circle shadow';
        }
        
        btnPedidosPend.innerHTML = `<i class="fal fa-bell"></i>${contador}`;
        

    });
};




function getDbDetallePedido(id, cliente){
 
    $('#ModalPendientesDetalle').modal('show');

    document.getElementById('lbPPenCliente').innerText = funciones.limpiarTexto(cliente);

    getPedidoEnviar(id)
    .then((response)=>{
                
        let container = document.getElementById('tblPPenDetalle');
        container.innerHTML = GlobalLoader;

        let containerTotal = document.getElementById('lbTotalPPend');
        containerTotal.innerHTML = '--.--';

        
        
        let str = '';
        let contador = 0;
        let totalventa = 0;

        let data = JSON.parse(response[0].JSONPRODUCTOS);
      
        
        data.map((rs)=>{
            contador = contador + 1;
            totalventa += Number(rs.TOTALPRECIO);
            str = str + `<tr class="border-bottom">
                            <td>${rs.DESPROD}
                                <br>
                                <small class="negrita">Cod: ${rs.CODPROD}</small>
                                
                            </td>
                            <td>${rs.CANTIDAD}
                                <br>
                                <small>${rs.CODMEDIDA}</small>
                            </td>
                            <td>${funciones.setMoneda(rs.TOTALPRECIO,'Q')}
                            </td>
                           
                        </tr>`    
        })
        container.innerHTML = str;
        containerTotal.innerText = funciones.setMoneda(totalventa,'');


    });
    
};

function dbDeletePedido(id){
    funciones.Confirmacion('¿Está seguro que desea Eliminar este Pedido?')
    .then((value)=>{
        if(value==true){
            
            $('#ModalPendientes').modal('hide');

            funciones.solicitarClave()
                .then((clave)=>{
                    if(clave==GlobalPassUsuario){

                        deletePedidoEnviado(id)
                        .then(()=>{
                            dbCargarPedidosPendientes();
                        })

                    }else{
                        funciones.AvisoError('Clave incorrecta')
                    }
                }
            )        
        }
    });

}

function deletePedidoEnviado(id){
    return new Promise(async(resolve,reject)=>{
        var rowsDeleted = await connection.remove({
            from: "documentos",
            where: {
                ID: Number(id)
            }
        });
        if(rowsDeleted>0){resolve()}else{resolve()}
    })            
};

function getPedidoEnviar(id){

    return new Promise(async(resolve,reject)=>{
        var response = await connection.select({
            
            from: "documentos",
            where: {
                    ID: Number(id)
                }
        });
        resolve(response)
    });
}

function dbSendPedido(id,idbtn){
   
    let btn = document.getElementById(idbtn);


        funciones.Confirmacion('¿Está seguro que desea Enviar este Pedido')
        .then((value)=>{
            if(value==true){

                btn.disabled = true;
                btn.innerHTML = '<i class="fal fa-paper-plane fa-spin"></i>';
                
                setLog(`<label class="text-danger">Intentando obtener el correlativo de documentos...</label>`,'rootWait');
                $('#modalWait').modal('show');

                classTipoDocumentos.getCorrelativoDocumento('PED',GlobalCoddoc)
                .then((correlativo)=>{
                    //lee el documento de la base de datos local y lo intenta enviar
                    setLog(`<label class="text-danger">Cargando los datos del documento para intentarlo enviar...</label>`,'rootWait');
                        
                    let datos; 
                    let nit;
                    getPedidoEnviar(id)
                    .then((response)=>{
                        response.map((rs)=>{
                            nit = rs.NITCLIE;
                            GlobalSelectedCodCliente = rs.CODCLIE;
                            datos = {
                                jsondocproductos:rs.JSONPRODUCTOS,
                                codsucursal:rs.CODSUCURSAL,
                                empnit: rs.EMPNIT,
                                coddoc:rs.CODDOC,
                                correl: correlativo.toString(),
                                anio:rs.ANIO,
                                mes:rs.MES,
                                dia:rs.DIA,
                                fecha:rs.FECHA,
                                fechaentrega:rs.FECHAENTREGA,
                                formaentrega:rs.FORMAENTREGA,
                                codbodega:GlobalCodBodega,
                                codcliente: rs.CODCLIE,
                                nomclie:rs.NOMCLIE,
                                totalcosto:rs.TOTALCOSTO,
                                totalprecio:rs.TOTALPRECIO,
                                nitclie:rs.NITCLIE,
                                dirclie:rs.DIRCLIE,
                                obs:rs.OBS,
                                direntrega:rs.DIRENTREGA,
                                usuario:rs.USUARIO,
                                codven:rs.CODVEN,
                                lat:rs.LAT,
                                long:rs.LONG
                            }
                        })
                        
                        setLog(`<label class="text-info">Intentando enviar el pedido...</label>`,'rootWait');
                
                        axios.post('/ventas/insertventa', datos)
                        .then(async(response) => {
                            const data = response.data;
                            if (data.rowsAffected[0]==0){
                                hideWaitForm();
                                btn.disabled = false;
                                btn.innerHTML = '<i class="fal fa-paper-plane"></i>Enviar';
                                funciones.AvisoError('No se logró Enviar este pedido');   
                            }else{
                                hideWaitForm();
                                funciones.Aviso('Pedido Enviado Exitosamente !!!')
                            
                                //actualiza la ubicación del empleado
                                await classEmpleados.updateMyLocation();
                                //actualiza la última venta del cliente
                                await apigen.updateClientesLastSale(nit,'VENTA');
                                deletePedidoEnviado(id)
                                .then(()=>{
                                    dbCargarPedidosPendientes();
                                })
                                                                                
                            }
                            //$('#modalWait').modal('hide');
                        }, (error) => {
                            //$('#modalWait').modal('hide'); 
                            hideWaitForm();
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fal fa-paper-plane"></i>Enviar';
                            funciones.AvisoError('Ha ocurrido un error y no se pudo enviar');
                           
                        })
                        .catch((error)=>{
                            //$('#modalWait').modal('hide');
                            hideWaitForm();
                            btn.disabled = false;
                            btn.innerHTML = '<i class="fal fa-paper-plane"></i>Enviar';
                            funciones.AvisoError('Error: ' + error);
                           
                        })
        
                    })


                })
                .catch(()=>{
                    //$('#modalWait').modal('hide');
                    hideWaitForm();
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fal fa-paper-plane"></i>Enviar';
                    funciones.AvisoError('No se pudo obtener el correlativo del documento a generar, revise su conexión a internet')
                })
                
                            
                
          

            }
        })
};


function dbSendPedidosBackground(usuario){
    return new Promise((resolve,reject)=>{
        resolve();
    })
    
};

