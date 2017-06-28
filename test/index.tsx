import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    UpGrid,
    UpCol,
    UpRow,
    UpBox,
    UpPanel,
    UpButton,
    UpThemeProvider,
    UpThemeInterface,
    UpDate,
    UpText,
    UpLabel,
    UpDefaultTheme,
    UpPhone,
    UpNumber,
    UpEmail,
    UpInput,
    UpFormGroup,
    UpSwitch,
    UpSelect
} from "../src/index";

import Timeline from "../src/Components/Display/TimeLine/index"

import * as moment from 'moment'


interface Item {
    id?: number;
    text: string;
}

interface DemoState {
    item: Item;
    user: any;
    items: Array<Item>;
    date: string;
    description: string;
    search: string;
    phone: string;
    email: string;
    number: number;
    integer: number;
}

var theme: UpThemeInterface = UpDefaultTheme
theme.colorMap.warning = "orange";

class Demo extends React.Component<undefined, DemoState> {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

        this.state = {
            date: "13/04/2017",
            item: {
                id: 1,
                text: "Item 1"
            },
            user: {
                id: 1,
                name: "User 1"
            },
            items: [
                {
                    text: "Item 1"
                },
                {
                    text: "Item 2"
                },
                {
                    text: "Item 3"
                },
                {
                    text: "Item 4"
                },
                {
                    text: "Item 5"
                }
            ],
            description: "",
            email: "",
            search: "",
            phone: "",
            number: 0,
            integer: 0
        }
    }
    public render() {
        
        var enti = {
            id: "id",
            name: "Inventaire",
            text: "{name}",
            query: "https://jsonplaceholder.typicode.com/users",//"http://localhost:9510/api/domain/Inventaire/IInventaireSearchQuery",
            queryParameterName: "args"
        };
        //"enumNames": ["choix1", "choix2", "choix3"],
        //      "enumDescriptions": ["Premier choix", "Second choix", "Troisieme choix"],
        //      "type": "integer",
        //      "format": "enum",
        //      "enum": [2, 4, 6]

        var aaa = [{ id: 1, text: "test" }, { id: 2, text: "test2" }];

        const groups = [
            { id: 2, title: 'group 2' },
            { id: 1, title: 'group 1' },
            { id: 3, title: 'group 3' }
        ]

        const items = [
            { id: 1, group: 1, title: 'item 1', start_time: moment('1995-12-25'), end_time: moment('1995-12-25').add(1, 'hour') },
            { id: 2, group: 2, title: 'item 2', start_time: moment('1995-12-25').add(-0.5, 'hour'), end_time: moment('1995-12-25').add(0.5, 'hour') },
            { id: 3, group: 3, title: 'item 3', start_time: moment('1995-12-25').add(2, 'hour'), end_time: moment('1995-12-25').add(3, 'hour') }
        ]

        var time = <Timeline groups={groups}
            items={items}
            defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
            defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
        />;

        return (
            <UpThemeProvider theme={theme}>
                <UpBox flexDirection="row" alignItems="stretch" justifyContent="center" >
                    <UpSelect
                        showError={true}
                        default={null}
                        isRequired={false}
                        multiple={true}
                        value={this.state.user}
                        onChange={this.onChangeUser}
                        placeholder="Recherche"
                        allowClear={false}
                        dataSource={enti}
                    />
                    <UpSelect
                        showError={true}
                        default={null}
                        isRequired={false}
                        multiple={true}
                        placeholder="Recherche"
                        allowClear={false}
                        value={this.state.item}
                        onChange={this.onChangeItem}
                        data={[
                            {
                                id: 1,
                                text: "Item 1"
                            },
                            {
                                id: 2,
                                text: "Item 2"
                            },
                            {
                                id: 3,
                                text: "Item 3"
                            },
                            {
                                id: 4,
                                text: "Item 4"
                            },
                            {
                                id: 5,
                                text: "Item 5"
                            }
                        ]}
                    />
                    <UpBox margin="small" boxSize={{ horizontal: 'small' }}>
                        Component
              <hr />
                    </UpBox>
                    <UpBox margin="small" boxSize={{ horizontal: 'xxlarge' }}>
                        Editor
              <hr />
                        <UpPanel title="Paramètres" type="info" disableAutoIntentIcon={true}>
                            <UpNumber max={5} min={2} onChange={this.onNumberChange} />
                            {time}
                            <UpGrid>
                                <UpRow gutter={10} >
                                    <UpCol span={12}>
                                        <UpSwitch isNullable={true} onChange={this.onNumberChange} />

                                    </UpCol>
                                    <UpCol span={12}>

                                        <UpSwitch isNullable={true} onChange={this.onNumberChange} />
                                    </UpCol>
                                </UpRow>
                                <UpRow gutter={10} >
                                    <UpCol span={12}>
                                        <UpSwitch isNullable={true} onChange={this.onNumberChange} />

                                    </UpCol>
                                    <UpCol span={12}>
                                        <UpSwitch value={true} isNullable={true} onChange={this.onNumberChange} />
                                        <UpSwitch value={false} isNullable={true} onChange={this.onNumberChange} />
                                        <UpSwitch value={null} isNullable={true} onChange={this.onNumberChange} />
                                        <UpSwitch value={true} isNullable={false} onChange={this.onNumberChange} />
                                        <UpSwitch value={false} isNullable={false} onChange={this.onNumberChange} />
                                        <UpSwitch value={null} isNullable={false} onChange={this.onNumberChange} />
                                    </UpCol>
                                </UpRow>
                            </UpGrid>


                            {this.state.number}
                        </UpPanel>

                        <UpPanel title="Paramètres" type="primary">
                            Mon message
              </UpPanel>
                        <UpPanel title="Paramètres" type="danger">
                            Mon message
              </UpPanel>
                        <UpPanel title="Paramètres" type="success">
                            Mon message
              </UpPanel>
                        <UpPanel title="Paramètres" type="warning">
                            Mon message
              </UpPanel>
                    </UpBox>
                </UpBox>
            </UpThemeProvider>
        );
    }
    onChangeItem = (newValue) => {
        this.setState({
            item: newValue
        });
    }
    onChangeUser = (newValue) => {
        this.setState({
            user: newValue
        });
    }
    onDateChange = (newDate) => {
        this.setState({
            date: newDate
        });
    }
    onTextChange = (data) => {
        this.setState({
            description: data
        });
    }
    onPhoneChange = (data) => {
        this.setState({
            phone: data
        });
    }
    onEmailChange = (data) => {
        this.setState({
            email: data
        });
    }
    onNumberChange = (data) => {
        this.setState({
            number: data
        });
    }
    onIntegerChange = (data) => {
        this.setState({
            integer: data
        });
    }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
