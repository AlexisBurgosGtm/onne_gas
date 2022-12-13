const execute = require('./connection');
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post("/fel_certificar", async(req,res)=>{

    const {nitemisor,xmldte, felnombre, felclave, identificador} = req.body;

    try {
        axios.post('https://certificador.feel.com.gt/fel/certificacion/v2/dte/',
        {nit_emisor: nitemisor, 
          correo_copia: "contadorgeneral@grupobuenavista.com.gt", 
          xml_dte: xmldte
        }, 
        {
          headers: {
            usuario: felnombre,
            llave: felclave,
            identificador: identificador,
            'Content-Type': 'application/json'
          } 
        })
        .then((response) => {
            const data = response.data;
            //console.dir(data);
            res.send(data);
        }, (error) => {
            //console.dir(error);
            res.send(error);
        });
    } catch (error) {
        //console.log(error);
        res.send({result:false});
    };

  
   
});


router.post("/fel_certificar_update_documento", async(req,res)=>{
    const {sucursal,coddoc,correlativo,uudi,serie,numero,fechacertificacion} = req.body;


    let qry = `UPDATE ME_DOCUMENTOS 
                SET 
                    FEL_UDDI='${uudi}', 
                    FEL_SERIE='${serie}',
                    FEL_NUMERO='${numero}',
                    FEL_FECHA='${fechacertificacion}'
                WHERE CODSUCURSAL='${sucursal}' AND CODDOC='${coddoc}' AND DOC_NUMERO='${correlativo}'`


    
    execute.Query(res,qry);

});


module.exports = router;