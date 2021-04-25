import React, { useEffect, useState, useRef } from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead,
    TableContainer, Paper, makeStyles, Container,
    Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete, SettingsInputSvideoSharp} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getCliente, addClientes, getClientes, updateClientes, deleteClientes} from '../data/clientesData';
import ClientesDialog from './ClientesDialog';

function searchingTerm(term){
    return function(x){
        return x.nombre.includes(term)  || !term; 
    }
}

const Clientes = () => {
    const classes  = useStyles();
    const [cliente, setCliente] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formMode, setFormMode] = useState(true);
    const [custId, setCustId] = useState('');
    const [ids, setIds] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');

    const [data, setData] = useState([]);
    const [term, setTerm] = useState('');
    useEffect(() => {
        setData(cliente);
    }, [cliente])
    const override =`
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
    const handleClose = () => {
        setOpen(false);
    }
    const handleIds = (event) => {
        setIds(event.target.value);
    }
    const handleNombre = (event) => {
        setNombre(event.target.value);
    }
    const handleApellido = (event) => {
        setApellido(event.target.value);
    }
    const handleCorreo = (event) => {
        setCorreo(event.target.value);
    }
    const handleTelefono = (event) => {
        setTelefono(event.target.value);
    }
    const handleDireccion = (event) => {
        setDireccion(event.target.value);
    }
    
    const getlist = async () => { 
        try {
            setLoading(true);
            const list = await getCliente();
            setCliente(list);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }
    const getOneClientes = async (id) => {
            try {
                setFormMode(false);
                setCustId(id);
                const response = await getClientes(id);
                 setIds(response.ids);
                 setNombre(response.nombre);
                 setApellido(response.apellido);
                 setCorreo(response.correo);
                 setTelefono(response.telefono);
                 setDireccion(response.direccion);
                 setOpen(true);
            } catch (error) {
                toast.error(error.message);
            }

    }
    const deleteHandler = async (id) => {
            try {
                await deleteClientes(id);
                getlist();
                toast.success('Cliente eliminado exitosamente');
            } catch (error) {
                toast.error(error.message);
            }
    }
    const handleAdd = () => {
            setOpen(true);
            setFormMode(true);
            setIds('');
            setNombre('');
            setApellido('');
            setCorreo('');
            setTelefono('');
            setDireccion(''); 
    }

    const addClientesHandler = async () => {
            try {
                 const clientes = {
                    ids,
                    nombre,
                    apellido,
                    correo,
                    telefono, 
                    direccion
                 }
                if (formMode) {
                    await addClientes(clientes);
                    toast.success('Cliente agregado exitosamente');
                    getlist();
                    setOpen(false);
                    setIds('');
                    setNombre('');
                    setApellido('');
                    setCorreo('');
                    setTelefono('');
                    setDireccion('');
                }else {
                    await updateClientes(custId, clientes);
                    toast.success('Cliente actualizado exitosamente');
                    getlist();
                    setOpen(false);
                    setIds('');
                    setNombre('');
                    setApellido('');
                    setCorreo('');
                    setTelefono('');
                    setDireccion('');
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
    <h1><b>Clientes</b></h1>
      
<div className="container">
    <table className="table table-bordered">
<div className="container">

 <div>
    <br></br>
    <h5>Buscar cliente por NOMBRE</h5>
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
                      Registro de los clientes
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        className={classes.button}
                        startIcon={<AddCircle/>}
                    >Agregar cliente</Button>
                    </Grid>
                </Grid>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>ID</TableCell>
                            <TableCell className={classes.head}>Nombre/Empresa</TableCell>
                            <TableCell className={classes.head}>Correo</TableCell>
                            <TableCell className={classes.head}>Telefono</TableCell>
                            <TableCell className={classes.head}>Dirección</TableCell>
                            <TableCell className={classes.head}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cliente.length === 0 ? (
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
                                  <TableCell>{cust.ids}</TableCell>
                                  <TableCell>{cust.nombre} {cust.apellido}</TableCell>
                                  <TableCell>{cust.correo}</TableCell>
                                  <TableCell>{cust.telefono}</TableCell>
                                  <TableCell>{cust.direccion}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => getOneClientes(cust.id)} color="primary" aria-label="Actualizar clíente">
                                            <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="Eliminar clíente">
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
            <ClientesDialog
                open={open} 
                close={handleClose}
                formmode={formMode}
                ids={ids}
                nombre={nombre}
                apellido={apellido}
                correo={correo}
                telefono={telefono}
                direccion={direccion}
                changeIds={handleIds}
                changeNombre={handleNombre}
                changeApellido={handleApellido}
                changeCorreo={handleCorreo}
                changeTelefono={handleTelefono}
                changeDireccion={handleDireccion}
                addClientes={addClientesHandler}
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



export default Clientes;