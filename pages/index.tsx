import * as React from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Paper, Typography} from 'material-ui';
import {app} from '../client/app';
import {PageContainer} from '../client/containers';
import {TechCard} from '../client/components';

interface OwnProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

const questions = ['Do you want to start with React?', 'Do you want to start with Material Design?', 'Do you want to start with Redux?'];

class Index extends React.Component<ConnectedState & ConnectedDispatch & OwnProps> {
    render() {
        return (
            <PageContainer>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Paper style={{padding: 8}}>
                            <Typography variant="subheading">
                                A boilerplate for React isomorphic aplication with Material Design, GraphQL, Redux, Redux Form and custom server
                            </Typography>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {questions.map((row) => <FormControlLabel key={row} control={<Checkbox checked />} label={`* ${row}`} />)}
                                </FormGroup>
                                <FormHelperText>...with Typescript</FormHelperText>
                            </FormControl>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/react.png'} title={'React'} description={'A JavaScript library for building user interfaces'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/material-design.png'} title={'Material Design'} description={'Make beautiful products, faster'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/redux.png'} title={'Redux'} description={'Predictable state container'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/graphql.png'} title={'GraphQL'} description={'A query language for your API'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/apollo.png'} title={'Apollo'} description={'Tools for GraphQL'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/ts.png'} title={'TypeScript'} description={'JavaScript that scales'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TechCard imgSrc={'/static/images/nextjs.jpeg'} title={'Next.js'} description={'Framework for server-rendered React apps'} />
                    </Grid>
                </Grid>
            </PageContainer>
        );
    }
}

export default app()(Index);
