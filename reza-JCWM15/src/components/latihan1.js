import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {Button, Input, Table} from 'reactstrap'
import {fetchAddData, fetchDataUsers, deleteAction, deleteAllAction, fetchJobAction, fetchJobList, deleteAllJob, deleteJob, editData, filterCategories, fetchCategory} from '../redux/action'


class Home extends React.Component{
    state = {
        nama:"",
        umur:"",
        pekerjaan:"",
        categoryID:0,
        selectedCategory: ""
    }

    onChangeInput = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })

        if(this.state.pekerjaan === "Front-End"){
            this.setState({categoryID:"1"})
        } else if (this.state.pekerjaan === "Back-End"){
            this.setState({categoryID:"2"})
        } else {
            this.setState({categoryID:"3"})
        }
        console.log(this.state)
    }

    onChangeCategory = (e) => {
        this.setState({
            selectedCategory: e.value
        })
    }

    renderAddUsers = () => {
        const {nama, usia, pekerjaan, categoryID} = this.state;
        const {fetchAddData, usersList, fetchJobAction, categories} = this.props
        fetchJobAction(pekerjaan)
        fetchAddData(nama, usia, pekerjaan, categoryID)
        console.log(usersList)
        console.log(categories)
    }
    componentDidMount(){
        const {fetchDataUsers, fetchJobList, filterCategories} = this.props
        fetchDataUsers()
        // fetchJobList()
        filterCategories()
    }

    componentDidUpdate(pP,pS){
        const {userID, fetchDataUsers, fetchJobList} =this.props
        if(pP.userID !== userID){
            fetchDataUsers()
            fetchJobList()
        }
        if (pS.selectedCategory !== this.state.selectedCategory){
            this.props.fetchCategory(this.state.selectedCategory)
        }
    }

    deleteUser = (id) => {
        const {deleteAction, userID, usersList, deleteJob} = this.props;
        deleteAction(id)
        deleteJob(id)
        console.log(usersList)
        console.log(userID)
    }

    deleteAll = () => {
        const {deleteAllAction, deleteAllJob} = this.props
        deleteAllAction()
        deleteAllJob()
    }

    editData = (index) => {
        // const {editData} = this.props
        // const {renderTableBody} = this.state
        // editData(id)
        // renderTableBody()
        // console.log(editData(id))
    }

    renderJobList = () => {
        // console.log(this.props.jobList)
        // let newArr = this.props.jobList.map((val) => {
        //     return(
        //         <option>{val.data}</option>
        //     )
        // });
        // return(<select className='form-control'>{newArr}
        // </select> )   
        let newArr = this.props.categories.map((val) =>{
            return {value: val.id, label:val.category}
        })
        return <Select options={newArr} onChange={this.onChangeCategory} />
    }

    renderTableBody = (index) => {
        return this.props.usersList.map((val, index) => {
            // if(editData === index){
            //     return (
            //         <div className='row'>
            //             <div>
            //                 <Input
            //                     className="text"
            //                     placeholder="Nama"
            //                     type="text"
            //                     id="nama"
            //                     value={this.state.nama}
            //                     onChange={this.onChangeInput}

            //                 />          
            //             </div>
            //             <div style={{margin:"20px"}}></div>
            //             <div>
            //                 <Input
            //                     className="text"
            //                     placeholder="Usia"
            //                     type="number"
            //                     id="usia"
            //                     value={this.state.usia}
            //                     onChange={this.onChangeInput}          
            //                 />                    
            //             </div>
            //             <div style={{margin:"20px"}}></div>
            //             <div> 
            //                 <Input
            //                     className="text"
            //                     placeholder="Pekerjaan"
            //                     type="text"
            //                     id="pekerjaan"
            //                     value={this.state.pekerjaan}
            //                     onChange={this.onChangeInput}          
            //                 />                    
            //             </div>
            //             <div style={{marginRight:"200px"}}></div>
            //             <div>
            //                 <Button color="secondary" style={{marginRight:"10px"}}>Confirm</Button>
            //                 <Button color="danger" >Cancel</Button>                   
            //             </div>
            //         </div>
            //     )               
            // }
            // else {
                return(
                    <tr>
                        <td>{index + 1}</td>
                        <td>{val.nama}</td>
                        <td>{val.usia}</td>
                        <td>{val.pekerjaan}</td>
                        <td>
                            <Button color="secondary" onClick={this.editData(index)} style={{marginRight:"10px"}}>Edit</Button>
                            <Button color="danger" onClick={() => this.deleteUser(val.id)}>Delete</Button>
                        </td>
                    </tr>     
                )

            // }
        })
    }
    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        {this.renderJobList()}
                        {/* <select className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select> */}
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div className='row'>
                    <div> 
                        <Input
                            className="text"
                            placeholder="Nama"
                            type="text"
                            id="nama"
                            value={this.state.nama}
                            onChange={this.onChangeInput}
                            
                        />
                    </div>
                    <div style={{margin:"20px"}}></div>
                    <div> 
                        <Input
                            className="text"
                            placeholder="Usia"
                            type="number"
                            id="usia"
                            value={this.state.usia}
                            onChange={this.onChangeInput}          
                        />                    
                    </div>
                    <div style={{margin:"30px"}}></div>
                    <div>               
                        <select className="form-control" value={this.state.value} categoryID={this.state.categoryID} onChange={this.onChangeInput} id="pekerjaan" label="categoryID">
                            <option value="Front-End" >Front-End</option>
                            <option value="Back-End" >Back-End</option>
                            <option value="Full-Stack" >Full-Stack</option>
                        </select>
                    </div>
                    {/* <div> 
                        <Input
                            className="text"
                            placeholder="Pekerjaan"
                            type="text"
                            id="pekerjaan"
                            value={this.state.pekerjaan}
                            onChange={this.onChangeInput}          
                        />                    
                    </div>   */}
                    <div style={{marginRight:"200px"}}></div>        
                    <div>
                    <Button onClick={this.renderAddUsers}>Add Data</Button>

                    </div>         
                </div>
                <div style={{marginTop:"15px"}}></div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Usia</th>
                                <th>Pekerjaan</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderTableBody()}</tbody>
                    </Table>
                </div>
                <tfoot>
                    <tr>
                        <td><Button color ="danger" onClick={this.deleteAll}>Delete All</Button></td>
                    </tr>
                </tfoot>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        usersList: state.jobCategories.users,
        jobList : state.jobCategories.job,
        categories: state.jobCategories.categories
    }
}

export default connect(mapStatetoProps, {fetchAddData, fetchDataUsers, deleteAction, deleteAllAction, fetchJobAction, fetchJobList, deleteAllJob, deleteJob, editData, filterCategories, fetchCategory }) (Home)