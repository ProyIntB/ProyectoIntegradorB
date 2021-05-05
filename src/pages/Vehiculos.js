import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer, 
   Paper, makeStyles, Container, Typography, Button, Grid, IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import {ToastContainer, toast} from 'react-toastify';
import {getVehiculo, addVehiculos, getVehiculos, updateVehiculos, deleteVehiculos} from '../data/VehiculosData';
import VehiculosDialog from './VehiculosDialog';
import "bootstrap/dist/css/bootstrap.css";

function searchingTerm(term){
  return function(x){
      return x.Placa.includes(term)  || !term; 
  }
}

const Vehiculos = () => {
  const classes = useStyles();
  const [vehiculo, setVehiculo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [custId, setCustId] = useState('');
  const [Placa, setPlaca] = useState('');
  const [Propietario, setPropietario] = useState('');
  const [Marca, setMarca] = useState('');
  const [Modelo, setModelo] = useState('');
  const [Año, setAño] = useState('');
  const [Color, setColor] = useState('');
  const [Kilometraje, setKilometraje] = useState('');

  const [data, setData] = useState([]);
    const [term, setTerm] = useState('');
    useEffect(() => {
        setData(vehiculo);
    }, [vehiculo])
  const override = `
      display: flex;
      align-items: center; 
      justify-content: center;
      border-color: red;
  `;

  const handleClose = () => {
    setOpen(false);
  }

  const handlePlaca = (event) => {
    setPlaca(event.target.value);
  }
  const handlePropietario = (event) => {
    setPropietario(event.target.value);
  }
  const handleMarca = (event) => {
    setMarca(event.target.value);
  }
  const handleModelo = (event) => {
    setModelo(event.target.value);
  }
  const handleAño = (event) => {
    setAño(event.target.value);
  }
  
  const handleColor = (event) => {
    setColor(event.target.value);
  }
  const handleKilometraje = (event) => {
    setKilometraje(event.target.value);
  }

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getVehiculo();
      setVehiculo(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  const getOneVehiculos = async (id) => {
    try {
      setFormMode(false);
      setCustId(id);
      const response = await getVehiculos(id);
      setPlaca(response.Placa);
      setPropietario(response.Propietario);
      setMarca(response.Marca);
      setModelo(response.Modelo);
      setAño(response.Año);
      setColor(response.Color);
      setKilometraje(response.Kilometraje);
      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const deleteHandler = async (id) => {
    try {
      await deleteVehiculos(id);
      getlist();
      toast.success('Vehículo eliminado exitosamente');
    } catch (error) {
      toast.error(error.message);
    }
  }
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    setPlaca('');
    setPropietario('');
    setMarca('');
    setModelo('');
    setAño('');
    setColor('');
    setKilometraje('');
  }

  const addVehiculosHandler = async () => {
    try {
      const vehiculos = {
        Placa, 
        Propietario,
        Marca,
        Modelo,
        Año,
        Color,
        Kilometraje
      }
      if(formMode) {
        await addVehiculos(vehiculos);
        toast.success('Vehículo agregado exitosamente');
        getlist();
        setOpen(false);
        setPlaca('');
        setPropietario('');
        setMarca('');
        setModelo('');
        setAño('');
        setColor('');
        setKilometraje('');

      }else {
        await updateVehiculos(custId, vehiculos);
        toast.success('Vehículo actualizado exitosamente');
        getlist();
        setOpen(false);
        setPlaca('');
        setPropietario('');
        setMarca('');
        setModelo('');
        setAño('');
        setColor('');
        setKilometraje('');
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
      <h1><b>Vehículos</b></h1>
      
<div className="container">
  <table className="table table-bordered">
<div className="container">

<div>
  <br></br>
  <h5>Buscar vehículo por PLACA</h5>
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
              <Typography className={classes.title} variante="h6" component="div">
                Registro de Vehículos
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                 variant="contained"
                 color="primary"
                 onClick={handleAdd}
                 className={classes.button}
                 startIcon={<AddCircle/>}
                 >Agregar vehículo</Button>
            </Grid>
          </Grid>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}> Placa </TableCell>
                <TableCell className={classes.head}> Propietario </TableCell>
                <TableCell className={classes.head}> Marca </TableCell>
                <TableCell className={classes.head}> Modelo </TableCell>
                <TableCell className={classes.head}> Año </TableCell>
                <TableCell className={classes.head}> Color </TableCell>
                <TableCell className={classes.head}> Kilometraje </TableCell>
                <TableCell className={classes.head}>  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehiculo.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <ScaleLoader
                     css={override}
                     size={150}
                     color={"#eb4034"}
                     loading={loading}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                {data.filter(searchingTerm(term)).map((cust) => (
                  <TableRow key={cust.id}>
                    <TableCell> {cust.Placa} </TableCell>
                    <TableCell> {cust.Propietario} </TableCell>
                    <TableCell> {cust.Marca} </TableCell>
                    <TableCell> {cust.Modelo} </TableCell>
                    <TableCell> {cust.Año} </TableCell>
                    <TableCell> {cust.Color} </TableCell>
                    <TableCell> {cust.Kilometraje} </TableCell>
                    <TableCell>
                      <IconButton onClick={() => getOneVehiculos(cust.id)} color="primary" aria-label="Actualizar vehículo">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteHandler(cust.id)} color="secondary" aria-label="Eliminar vehículo">
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
        <VehiculosDialog
          open={open}
          close={handleClose}
          formmode={formMode}
          Placa={Placa}
          Propietario={Propietario}
          Marca={Marca}
          Modelo={Modelo}
          Año={Año}
          Color={Color}
          Kilometraje={Kilometraje}
          changePlaca={handlePlaca}
          changePropietario={handlePropietario}
          changeMarca={handleMarca}
          changeModelo={handleModelo}
          changeAño={handleAño}
          changeColor={handleColor}
          changeKilometraje={handleKilometraje}
          addVehiculos={addVehiculosHandler}
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

export default Vehiculos;