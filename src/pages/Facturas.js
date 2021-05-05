import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete, SettingsInputSvideoSharp} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getFactura, addFacturas, getFacturas, updateFacturas, deleteFacturas} from '../data/facturasData';
import FacturasDialog from './FacturasDialog';

function searchingTerm(term){
    return function(x){
        return x.rfc.includes(term)  || !term; 
    }
}

const Facturas = () => {
    const classes  = useStyles();
    const [factura, setFactura] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [razon, setRazon] = useState('');
    const [rfc, setRfc] = useState('');
    const [calle, setCalle] = useState('');
    const [colonia, setColonia] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [cp, setCp] = useState('');
    const [telefono, setTelefono] = useState('');

    const [data, setData] = useState([]);
    const [term, setTerm] = useState('');
    useEffect(() => {
        setData(factura);
    }, [factura])
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleRazon = (event) => {
        setRazon(event.target.value);
    }
    const handleRfc = (event) => {
        setRfc(event.target.value);
    }
    const handleCalle = (event) => {
        setCalle(event.target.value);
    }
    const handleColonia = (event) => {
        setColonia(event.target.value);
    }
    const handleMunicipio = (event) => {
      setMunicipio(event.target.value);
    }
    const handleCp = (event) => {
      setCp(event.target.value);
    }
    const handleTelefono = (event) => {
        setTelefono(event.target.value);
    }
    
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getFactura();
            setFactura(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneFacturas = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getFacturas(id);
                 setRazon(response.razon);
                 setRfc(response.rfc);
                 setCalle(response.calle);
                 setColonia(response.colonia);
                 setMunicipio(response.municipio);
                 setCp(response.cp);
                 setTelefono(response.telefono);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteFacturas(id);
                getlist();
                toast.success('Factura eliminada exitosamente');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setRazon('');
            setRfc('');
            setCalle('');
            setColonia('');
            setMunicipio('');
            setCp('');
            setTelefono('');
    }

    const addFacturasHandler = async () => {
            try {
                 const facturas = {
                    razon,
                    rfc,
                    calle,
                    colonia,
                    municipio,
                    cp,
                    telefono
                 }
                if (formMode) {
                    await addFacturas(facturas);
                    toast.success('Factura agregada exitosamente');
                    getlist();
                    setOpen(false);
                    setRazon('');
                    setRfc('');
                    setCalle('');
                    setColonia('');
                    setMunicipio('');
                    setCp('');
                    setTelefono('');
                }else {
                    await updateFacturas(custId, facturas);
                    toast.success('Factura actualizada exitosamente');
                    getlist();
                    setOpen(false);
                    setRazon('');
                    setRfc('');
                    setCalle('');
                    setColonia('');
                    setMunicipio('');
                    setCp('');
                    setTelefono('');
                }
            } catch (error) {
                toast.error(error.message);
            }
    }

    useEffect(() => {
        getlist();
    }, []);
    return (
        <Container className={classes.container}>
<div className="App container">
    <h1><b>Facturas</b></h1>
      
<div className="container">
    <table className="table table-bordered">
<div className="container">

 <div>
    <br></br>
    <h5>Selección del cliente</h5>
    <br></br>
    <h6>Buscar datos por RFC</h6>
</div>

<div>

    <div className="ui search">
        <div className="ui icon input">
            {data && ( 
            <input 
            type="text" 
            placeholder="Buscar" 
            className="prompt"
            name="term" 
            onChange={ e => setTerm(e.target.value)} 
            />
            )}
        </div>
    </div>

    
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Grid container>
                    <Grid item xs={8}>
                    <Typography className={classes.title} variant="h6" component="div">
                      
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Registrar cliente</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Razón social</TableCell>
                            <TableCell className={classes.head}>RFC</TableCell>
                            <TableCell className={classes.head}>Calle</TableCell>
                            <TableCell className={classes.head}>Colonia</TableCell>
                            <TableCell className={classes.head}>Municipio</TableCell>
                            <TableCell className={classes.head}>CP</TableCell>
                            <TableCell className={classes.head}>Telefono</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {factura.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <ScaleLoader 
                                     css={override}
                                    size={150}
                                    color={"#eb4034"}
                                    loading={loading}/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {data.filter(searchingTerm(term)).map((cust) => (
                                <TableRow key={cust.id}>
                                  <TableCell>{cust.razon}</TableCell>
                                  <TableCell>{cust.rfc}</TableCell>
                                  <TableCell>{cust.calle}</TableCell>
                                  <TableCell>{cust.colonia}</TableCell>
                                  <TableCell>{cust.municipio}</TableCell>
                                  <TableCell>{cust.cp}</TableCell>
                                  <TableCell>{cust.telefono}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneFacturas(cust.id)} color="primary" aria-label="Actualizar factura">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="Eliminar factura">
                                        <Delete />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                            ))}
                              
                            </>
                        )}
                        
                    </TableBody>
                </Table>  
            </TableContainer>
            <FacturasDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                razon={razon}
                rfc={rfc}
                calle={calle}
                colonia={colonia}
                municipio={municipio}
                cp={cp}
                telefono={telefono}
                changeRazon={handleRazon}
                changeRfc={handleRfc}
                changeCalle={handleCalle}
                changeColonia={handleColonia}
                changeMunicipio={handleMunicipio}
                changeCp={handleCp}
                changeTelefono={handleTelefono}
                addFacturas={addFacturasHandler}
            />
</div>     

</div>
  <br></br>
  </table>
  <br></br>
</div>
</div>
        </Container>
    );
}


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    container: {
        marginTop: '40px'
    }, 
    title: {
        flex: '1 1 100%',
        padding: '20px'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(1),
        float: 'right',
    },
}));

export default Facturas;
