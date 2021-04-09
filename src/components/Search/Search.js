import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { Jumbotron, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Table } from 'reactstrap';
import Row from '../Row/Row';



class Search extends Component {

    state = {
        round :[],
        searchres : [],
        searchstatus:false,
        credentials: {searchField:'', typeofsearch:'idnum',dobFrom:'',dobTo:''},
        redirect: null,
        
    }

    loadData = event =>{
        fetch('https://abd-ali-form.herokuapp.com/rounds',{
            method:'GET',
        })
        .then(data =>data.json())
        .then(
            data => {
                console.log(data);
                this.setState({round:data});
            }
        ).catch(error => console.log("here",error));

    }

    inputChanged = event =>{
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials : cred});
        console.log(this.state.credentials);
    }

    handelSearch =()=>{
        if (this.state.credentials.searchField !==''){
            let url = `https://abd-ali-form.herokuapp.com/search`;
            fetch(url,
            {
                body: JSON.stringify(this.state.credentials),
                method: "post"
            }).then(res => res.json())
            .then(res => 
                {   
                    console.log(res);
                    if(res ==='Data Not Found'){
                        alert('لا يوجد نتائج للبحث')
                    }else{
                    this.setState({searchres : res,searchstatus:true});
                    }
                }
                );
    }else{
        alert('ادخل حقل البحث')
    }
    
}

handelSearchDate =()=>{
    if (this.state.credentials.dobFrom !=='' && this.state.credentials.dobTo !==''){
        let url = `https://abd-ali-form.herokuapp.com/search`;
        fetch(url,
        {
            body: JSON.stringify(this.state.credentials),
            method: "post"
        }).then(res => res.json())
        .then(res => 
            {   
                console.log(res);
                if(res ==='Data Not Found'){
                    alert('لا يوجد نتائج للبحث')
                }else{
                this.setState({searchres : res,searchstatus:true});
                }
            }
            );
}else{
    alert('ادخل حقل البحث')
}

}



    allData=()=>{
        console.log('all Data')
        this.setState({searchstatus:false})
    }


    componentDidMount(){
        this.loadData();
    }
    


    render(){
        
        let rounds=[];

        if(! this.state.searchstatus){
            rounds =this.state.round.map( round => {
                return <Row round={round} />
        });
    
    }else{
            rounds =this.state.searchres.map( round => {
            return <Row round={round} />
        });
    }
    

        return(
            <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12" >
                            <h1> بيانات الجوالات الخاصة بالمراقبين</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <br></br>
            <br></br>

            <FormGroup className='special' row>
                <Col md={3}>
                    <Input type="text" id="searchField" name="searchField"
                        value={this.state.credentials.searchField}
                        required
                        onChange={this.inputChanged} />
                </Col>
                    <Col md={3}>{/* , offset: 1 */}
                        <Input type="select" name="typeofsearch"
                                required
                                value={this.state.typeofsearch}
                                onChange={this.inputChanged}>
                            <option value="idnum">رقمه</option>
                            <option value="telnum">الجوال</option>
                            <option value="namesofobservers">اسم المراقب</option>
                            <option value="ownerName">اسم صاحب النشاط</option>
                        </Input>
                    </Col>
                    <Col md={{size: 2}}>
                            <Button type="button" color="dark" onClick={this.handelSearch}>
                                بحث
                            </Button>
                    </Col>
                    

            </FormGroup>
            <FormGroup row className='special'>
            <Label className="labelfordate" htmlFor="dobFrom" md={3}>من</Label>
                <Label className="labelfordate" htmlFor="dobTo" md={3}>الى</Label>
            </FormGroup>

            <FormGroup className='special' row>
                    <Col md={{size: 3,offset:0}}>
                        <Input type="date" id="dobFrom" name="dobFrom"
                            onChange={this.inputChanged} />
                    </Col>
                    <Col md={{size: 3,offset:0}}>
                        <Input type="date" id="dobTo" name="dobTo"
                            
                            onChange={this.inputChanged} />
                    </Col>
                    <Col md={{size: 2}}>
                            <Button type="button" color="dark" onClick={this.handelSearchDate}>
                                بحث حسب التاريخ
                            </Button>
                    </Col>
                    <Col md={{size: 2}}>
                            <Button type="button" color="dark" onClick={this.allData}>
                                كل البيانات
                            </Button>
                    </Col>
            </FormGroup>

            <br></br> <br></br>
            <br></br>

            <Table className='specialTable' striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>اسماء المراقبين</th>
                        <th>الملاحظات</th>
                        <th>جوال</th>
                        <th>تاريخ الميلاد</th>
                        <th>رقمه</th>
                        <th>نوع الاثبات</th>
                        <th>اسم صاحب النشاط</th>
                        <th>نوع النشاط</th>
                        <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rounds}
                    </tbody>
            </Table>
            </>
        );
    }

}


export default Search;