import React from 'react';

import {Dialog, DialogActions, DialogContent, DialogTitle, Button,
    Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const RemisionesDialog = (props) => {
    return (
        <Dialog
        fullWidth={true}
        maxWidth='lg'
        open={props.open}
        onClose={props.close}
        aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle>{props.formmode ?  'Agregar nueva remisión' : 'Actualizar'}  </DialogTitle>
            <ValidatorForm
                onSubmit={props.addRemisiones}
            >
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextValidator
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Folio"
                            onChange={props.changeFolio}
                            name="folio"
                            value={props.folio}
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
                            label="Fecha(dd/mm/aaaa"
                            onChange={props.changeFecha}
                            name="fecha"
                            value={props.fecha}
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
                                label="Descripción"
                                onChange={props.changeDescripcion}
                                name="descripcion"
                                value={props.descripcion}
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
                                label="Total"
                                onChange={props.changeTotal}
                                name="total"
                                value={props.total}
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
                                label="Forma de pago"
                                onChange={props.changePago}
                                name="pago"
                                value={props.pago}
                                validators={['required']}
                                errorMessages={['Este campo es obligatorio']}
                                autoComplete='off'
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Estado</FormLabel>
                                <RadioGroup aria-label="Estado" name="estado" value={props.estado} onChange={props.changeEstado}>
                                    <FormControlLabel value="Pendiente" control={<Radio />} label="Pendiente" />
                                    <FormControlLabel value="Pagada" control={<Radio />} label="Pagada" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Facturación</FormLabel>
                            <RadioGroup aria-label="Facturación" name="facturacion" value={props.facturacion} onChange={props.changeFacturacion}>
                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Garantía</FormLabel>
                            <RadioGroup aria-label="Garantía" name="garantia" value={props.garantia} onChange={props.changeGarantia}>
                                <FormControlLabel value="Si" control={<Radio />} label="Si" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
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

export default RemisionesDialog;