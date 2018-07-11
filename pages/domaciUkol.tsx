import * as React from 'react';
import {ChangeEvent} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    withStyles,
} from '@material-ui/core';
import {Edit as EditIcon, Remove as RemoveIcon} from '@material-ui/icons';
import {Layout} from '../client/modules/common/components/page';

enum TypProjektu {
    CASOVE_OMEZENY,
    CI,
}

interface ProjectModel {
    readonly id: number;
    readonly nazev: string;
    readonly datumOdevzdani: string;
    readonly typProjektu: TypProjektu;
    readonly webovyProjekt: boolean;
}

let persistData = [
    {id: 1, nazev: 'Prvni projekt', datumOdevzdani: '12.2.2018', typProjektu: TypProjektu.CASOVE_OMEZENY, webovyProjekt: false},
    {id: 2, nazev: 'Druhy projekt', datumOdevzdani: '13.6.2018', typProjektu: TypProjektu.CI, webovyProjekt: true},
];

const ProjectService = {
    getAll: (): ProjectModel[] => persistData,

    findById: (id: number): ProjectModel | undefined => ProjectService.getAll().find((f) => f.id === id),

    createOrUpdate(data: Partial<ProjectModel>) {
        if (!data.id) {
            persistData.push({...(data as ProjectModel), id: persistData.length + 1});
        } else {
            persistData = persistData.map((f) => (f.id === data.id ? {...(data as ProjectModel)} : f));
        }
    },

    remove(id: number) {
        persistData = persistData.filter((f) => f.id !== id);
    },
};

interface State {
    projekty: ProjectModel[];
    isOpenDialog: boolean;
    editId?: number;
}

export default class extends React.Component<void, Readonly<State>> {
    constructor(props: void, context: any) {
        super(props, context);
        this.state = {
            projekty: ProjectService.getAll(),
            isOpenDialog: false,
        };
    }

    handleOnClickNew = () => {
        this.setState((prevState) => ({...prevState, isOpenDialog: true, editId: undefined}));
    };

    handleOnClickEdit = (id: number) => {
        this.setState((prevState) => ({...prevState, isOpenDialog: true, editId: id}));
    };

    handleOnDialogClose = () => {
        this.setState((prevState) => ({...prevState, isOpenDialog: false, editId: undefined}));
    };

    handleOnSubmit = (values: Partial<ProjectModel>) => {
        ProjectService.createOrUpdate(values);
        this.setState((prevState) => ({...prevState, isOpenDialog: false, projekty: ProjectService.getAll()}));
    };

    handleOnClickRemove = (id: number) => {
        ProjectService.remove(id);
        this.setState((prevState) => ({...prevState, isOpenDialog: false, projekty: ProjectService.getAll()}));
    };

    render() {
        const {projekty, isOpenDialog, editId} = this.state;
        return (
            <Layout>
                <Typography variant="title">Domácí úkol</Typography>

                <Button variant="raised" color="primary" onClick={this.handleOnClickNew}>
                    Novy projekt
                </Button>
                <Paper>
                    <ProjectTable data={projekty} onClickEdit={this.handleOnClickEdit} onClickRemove={this.handleOnClickRemove} />
                </Paper>
                <ProjectDialog open={isOpenDialog} onClose={this.handleOnDialogClose} editId={editId} onSubmit={this.handleOnSubmit} />
            </Layout>
        );
    }
}

interface ProjectTableProps {
    data: ProjectModel[];
    onClickEdit: (id: number) => void;
    onClickRemove: (id: number) => void;
}

const ProjectTable = withStyles((_) => ({}))<Readonly<ProjectTableProps>>(({data, onClickEdit, onClickRemove}) => {
    const handleOnClickEdit = (id: number) => () => {
        onClickEdit(id);
    };

    const handleOnClickRemove = (id: number) => () => {
        onClickRemove(id);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nazev</TableCell>
                    <TableCell>Typ projektu</TableCell>
                    <TableCell>Datum odevzdani</TableCell>
                    <TableCell>Webovy projekt</TableCell>
                    <TableCell>Editovat</TableCell>
                    <TableCell>Smazat</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.nazev}</TableCell>
                        <TableCell>{row.typProjektu === TypProjektu.CI ? 'CD/CI' : 'Casove omezeny'}</TableCell>
                        <TableCell>{row.datumOdevzdani}</TableCell>
                        <TableCell>{row.webovyProjekt ? 'Ano' : 'Ne'}</TableCell>
                        <TableCell>
                            <IconButton onClick={handleOnClickEdit(row.id)}>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={handleOnClickRemove(row.id)}>
                                <RemoveIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
});

interface ProjectDialogProps {
    open: boolean;
    editId?: number;
    onClose: () => void;
    onSubmit: (values: Partial<ProjectModel>) => void;
}

interface ProjectDialogState {
    data: Partial<ProjectModel>;
}

const defaultData = {nazev: '', datumOdevzdani: '', typProjektu: TypProjektu.CASOVE_OMEZENY};

// tslint:disable-next-line
class ProjectDialog extends React.Component<ProjectDialogProps, ProjectDialogState> {
    constructor(props: ProjectDialogProps, context: any) {
        super(props, context);
        this.state = {
            data: defaultData,
        };
    }

    static getDerivedStateFromProps(nextProps: ProjectDialogProps, prevState: ProjectDialogState) {
        if (!nextProps.open) {
            return {data: defaultData};
        }
        if (nextProps.editId === prevState.data.id) {
            return null;
        }
        return {
            data: nextProps.editId ? ProjectService.findById(nextProps.editId) : defaultData,
        };
    }

    handleOnChange = (name: keyof ProjectModel) => (e: ChangeEvent<any>) => {
        this.setState({data: {...this.state.data, [name]: name === 'webovyProjekt' ? e.target.checked : e.target.value}});
    };

    handleOnSubmit = () => {
        this.props.onSubmit({id: this.props.editId, ...this.state.data});
    };

    render() {
        const {open, editId, onClose} = this.props;
        const {data} = this.state;
        return (
            <Dialog open={open} keepMounted>
                <DialogTitle>{editId ? 'Editace projektu' : 'Novy projekt'}</DialogTitle>
                {open && (
                    <DialogContent>
                        <Grid container spacing={16}>
                            <Grid item xs={12}>
                                <TextField id="nazev" label="Nazev" value={data.nazev} onChange={this.handleOnChange('nazev')} fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="datumOdevzdani"
                                    label="Datum odevzdani"
                                    value={data.datumOdevzdani}
                                    onChange={this.handleOnChange('datumOdevzdani')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="typProjektu">Typ projektu</InputLabel>
                                    <Select
                                        value={data.typProjektu}
                                        onChange={this.handleOnChange('typProjektu')}
                                        inputProps={{
                                            name: 'Typ',
                                            id: 'typProjektu',
                                        }}
                                    >
                                        <MenuItem value={TypProjektu.CASOVE_OMEZENY}>Casove omezeny</MenuItem>
                                        <MenuItem value={TypProjektu.CI}>CD/CI</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={data.webovyProjekt} onChange={this.handleOnChange('webovyProjekt')} value="webovyProjekt" />}
                                    label="Webovy projekt"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={onClose}>Zavrit</Button>
                    <Button color="primary" onClick={this.handleOnSubmit}>
                        Ulozit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
