import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getRemision, addRemisiones, getRemisiones, updateRemisiones, deleteRemisiones} from '../data/remisionesData';
import RemisionesDialog from './RemisionesDialog';

function searchingTerm(term){
    return function(x){
        return x.folio.includes(term)  || !term; 
    }
}

const Remisiones = () => {
    const classes  = useStyles();
    const [remision, setRemision] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [folio, setFolio] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] =  useState('');
    const [total, setTotal] = useState('');
    const [pago, setPago] = useState('');
    const [estado, setEstado] = useState('Pendiente');
    const [facturacion, setFacturacion] = useState('Si');
    const [garantia, setGarantia] = useState('Si');

    const [data, setData] = useState([]);
    const [term, setTerm] = useState('');
    useEffect(() => {
        setData(remision);
    }, [remision])
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleFolio = (event) => {
        setFolio(event.target.value);
    }
    const handleFecha = (event) => {
        setFecha(event.target.value);
    }
    const handleDescripcion = (event) => {
        setDescripcion(event.target.value);
    }
    const handleTotal = (event) => {
        setTotal(event.target.value);
    }
    const handlePago = (event) => {
        setPago(event.target.value);
    }
    const handleEstado = (event) => {
        setEstado(event.target.value);
    }
    const handleFacturacion = (event) => {
        setFacturacion(event.target.value);
    }
    const handleGarantia = (event) => {
        setGarantia(event.target.value);
    }
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getRemision();
            setRemision(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneRemisiones = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getRemisiones(id);
                 setFolio(response.folio);
                 setFecha(response.fecha);
                 setDescripcion(response.descripcion);
                 setTotal(response.total);
                 setPago(response.pago);
                 setEstado(response.estado);
                 setFacturacion(response.facturacion);
                 setGarantia(response.garantia);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteRemisiones(id);
                getlist();
                toast.success('Remisión eliminada exitosamente');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setFolio('');
            setFecha('');
            setDescripcion('');
            setTotal('');
            setPago('');
            setEstado('Pendiente');
            setFacturacion('Si');
            setGarantia('Si');
    }

    const addRemisionesHandler = async () => {
            try {
                 const remisiones = {
                     folio,
                     fecha,
                     descripcion, 
                     total,
                     pago,
                     estado,
                     facturacion,
                     garantia
                 }
                if (formMode) {
                    await addRemisiones(remisiones);
                    toast.success('Remisión agregada exitosamente');
                    getlist();
                    setOpen(false);
                    setFolio('');
                    setFecha('');
                    setDescripcion('');
                    setTotal('');
                    setPago('');
                    setEstado('Pendiente');
                    setFacturacion('Si');
                    setGarantia('Si'); 
                }else {
                    await updateRemisiones(custId, remisiones);
                    toast.success('Remisión actualizada exitosamente');
                    getlist();
                    setOpen(false);
                    setFolio('');
                    setFecha('');
                    setDescripcion('');
                    setTotal('');
                    setPago('');
                    setEstado('Pendiente');
                    setFacturacion('Si');
                    setGarantia('Si');
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
    <h1><b>Remisiones</b></h1>
      
<div className="container">
    <table className="table table-bordered">
<div className="container">

<div>
    <br></br>
    <h5>Buscar remisión por FOLIO</h5>
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
                        Datos generales de la remisión
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Crear remisión</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Folio</TableCell>
                            <TableCell className={classes.head}>Fecha</TableCell>
                            <TableCell className={classes.head}>Descripción</TableCell>
                            <TableCell className={classes.head}>Total</TableCell>
                            <TableCell className={classes.head}>Forma de pago</TableCell>
                            <TableCell className={classes.head}>Estado</TableCell>
                            <TableCell className={classes.head}>Facturación</TableCell>
                            <TableCell className={classes.head}>Garantía</TableCell>
                            <TableCell className={classes.head}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {remision.length === 0 ? (
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
                                  <TableCell>{cust.folio}</TableCell>
                                  <TableCell>{cust.fecha}</TableCell>
                                  <TableCell>{cust.descripcion}</TableCell>
                                  <TableCell>{cust.total}</TableCell>
                                  <TableCell>{cust.pago}</TableCell>
                                  <TableCell>{cust.estado}</TableCell>
                                  <TableCell>{cust.facturacion}</TableCell>
                                  <TableCell>{cust.garantia}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneRemisiones(cust.id)} color="primary" aria-label="Actualizar remisión">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="Eliminar remisión">
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
            <RemisionesDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                folio={folio}
                fecha={fecha}
                descripcion={descripcion}
                total={total}
                pago={pago}
                estado={estado}
                facturacion={facturacion}
                garantia={garantia}
                changeFolio={handleFolio}
                changeFecha={handleFecha}
                changeDescripcion={handleDescripcion}
                changeTotal={handleTotal}
                changePago={handlePago}
                changeEstado={handleEstado}
                changeFacturacion={handleFacturacion}
                changeGarantia={handleGarantia}
                addRemisiones={addRemisionesHandler}
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

export default Remisiones;
