import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const ClientesDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Agregar nuevo cliente' : 'Actualizar'}  </DialogTitle>
            <ValidatorForm
                onSubmit={props.addClientes}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="ID"
                            onChange={props.changeIds}
                            name="ids"
                            value={props.ids}
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
                            label="Nombre(s)"
                            onChange={props.changeNombre}
                            name="nombre"
                            value={props.nombre}
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
                                label="Apellidos"
                                onChange={props.changeApellido}
                                name="apellido"
                                value={props.apellido}
                                
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextValidator
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Correo"
                                onChange={props.changeCorreo}
                                name="correo"
                                value={props.correo}
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
                                label="Telefono"
                                onChange={props.changeTelefono}
                                name="telefono"
                                value={props.telefono}
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
                                label="Direccion"
                                onChange={props.changeDireccion}
                                name="direccion"
                                value={props.direccion}
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
                    <Button onClick={props.close} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}

export default ClientesDialog;