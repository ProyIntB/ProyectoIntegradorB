import react  from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, 
        FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const VehiculosDialog = (props) => {
    return(
        <Dialog 
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title">
            <DialogTitle>{props.formmode ? 'Agregar nuevo vehículo' : 'Actualizar'}</DialogTitle>
            <ValidatorForm
               onSubmit={props.addVehiculos}> 
               <DialogContent>
                   <Grid container spacing={3}>
                       <Grid item xs={6}>
                           <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Placa"
                              onChange={props.changePlaca}
                              name="Placa"
                              value={props.Placa} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Propietario"
                              onChange={props.changePropietario}
                              name="Propietario"
                              value={props.Propietario} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Marca"
                              onChange={props.changeMarca}
                              name="Marca"
                              value={props.Marca} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Modelo"
                              onChange={props.changeModelo}
                              name="Modelo"
                              value={props.Modelo}   
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Año"
                              onChange={props.changeAño}
                              name="Año"
                              value={props.Año} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Color"
                              onChange={props.changeColor}
                              name="Color"
                              value={props.Color} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                       <Grid item xs={6}>
                       <TextValidator 
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              label="Kilometraje"
                              onChange={props.changeKilometraje}
                              name="Kilometraje"
                              value={props.Kilometraje} 
                              validators={['required']}
                              errorMessages={['Este campo es obligatorio']}
                              autoComplete='off'
                            />
                       </Grid>
                   </Grid>
               </DialogContent>
               <DialogActions>
                   <Button type="submit" color="secondary"> 
                       {props.formmode ? 'Agregar' : 'Actualizar'}
                    </Button>
                   <Button onClick={props.close} color="primary">Cerrar</Button>
               </DialogActions> 
            </ValidatorForm>
        </Dialog>
    );
}

export default VehiculosDialog;