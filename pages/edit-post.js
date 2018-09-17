import {Component} from 'react'
import withLayout from '../components/Layouts/Layout'
import axios from 'axios'
import jscookie from 'js-cookie'
import styles from './editPostStyle'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCamera from '@fortawesome/fontawesome-free-solid/faCamera'
import instyles from '../pages/indexStyle'

class editPost extends Component{
    
        state={
            loggedinUser: '',
            title: '',
            post: '',
            imgSrc: '',
            id: '',
            selectedFile:'',
            accno: '',
            mobile: '',
            city:'',
            slug:'',
            published: '',
            isLoading: true
        }
        static async getInitialProps ({query}) {
                return query
            }
        componentDidMount(){
            const customCode = this.props.url.query.customCode;
            axios.get('http://api.pihitak.com/post',{
                params:{
                    customId: customCode
                }
            })
            .then((Response)=>{
                this.setState({
                    id: Response.data.Items[0].postId,
                    title: Response.data.Items[0].postTitle,
                    post: Response.data.Items[0].PostDesc,
                    imgSrc: Response.data.Items[0].PostSrc,
                    accno: Response.data.Items[0].AccountNo,
                    mobile: Response.data.Items[0].mobile,
                    city: Response.data.Items[0].city,
                    slug: Response.data.Items[0].Slug,
                    published: Response.data.Items[0].Published,
                    isLoading:false
                })
            })
            .catch((error)=>{
                console.log(error)
            })


            let token = jscookie.getJSON('token')
            
            if(token){
                this.setState({
                    loggedinUser : token
                })
            }
        }
        handleInputChange =(event) =>{
            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState({
                [name]:value
            })
        }

        handleSubmit = (event) =>{
            const {id, title, post, accno, imgSrc, mobile, city, published } = this.state;
            const formData = new FormData()
            formData.append('file',this.state.selectedFile)
            formData.append('upload_preset', "iv3w5ot5")
            const config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            };
            const slug = this.state.slug.replace(/\s+/g, '-').toLowerCase();

            if(published =="Pending"){
                if(this.state.selectedFile!=''){
                    axios.post('https://api.cloudinary.com/v1_1/myprojectx/image/upload',formData,config)
                    .then((Response)=>{
                        axios.post('http://api.pihitak.com/edit-post',{
                        postId: id,
                        postTitle : title,
                        post: post,
                        fileUrl: Response.data.url,
                        accno: accno,
                        tele: mobile,
                        city: city,
                        slug: slug,
                        published: 'Approved'
                    })
                        .then((Response)=>{
                        if(Response.data.StatusCode==201){
                            console.log('Post Updated Successfully')
                            this.setState({
                                title: '',
                                post: '',
                                selectedFile: '',
                                id: '',
                                imgSrc: '',
                                accno: '',
                                mobile:'',
                                city:'',
                                slug:'',
                                published:''
                            })
                        }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                }
                else{
                    axios.post('http://api.pihitak.com/edit-post',{
                        postId: id,
                        postTitle : title,
                        post: post,
                        fileUrl: imgSrc,
                        accno: accno,
                        tele: mobile,
                        city: city,
                        slug: slug,
                        published: 'Approved'
    
                    })
                        .then((Response)=>{
                        if(Response.data.StatusCode==201){
                            console.log('Post Updated Successfully')
                            this.setState({
                                title: '',
                                post: '',
                                selectedFile: '',
                                id: '',
                                imgSrc: '',
                                accno: '',
                                mobile:'',
                                city:'',
                                slug:'',
                                published: ''
                            })
                        }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                }      
            }
            else{
                if(this.state.selectedFile!=''){
                    axios.post('https://api.cloudinary.com/v1_1/myprojectx/image/upload',formData,config)
                    .then((Response)=>{
                        axios.post('http://api.pihitak.com/edit-post',{
                        postId: id,
                        postTitle : title,
                        post: post,
                        fileUrl: Response.data.url,
                        accno: accno,
                        tele: mobile,
                        city: city,
                        slug: slug,
                        published: 'Approved'
                    })
                        .then((Response)=>{
                        if(Response.data.StatusCode==201){
                            console.log('Post Updated Successfully')
                            this.setState({
                                title: '',
                                post: '',
                                selectedFile: '',
                                id: '',
                                imgSrc: '',
                                accno: '',
                                mobile:'',
                                city:'',
                                slug:'',
                                published:''
                            })
                        }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                }
                else{
                    axios.post('http://api.pihitak.com/edit-post',{
                        postId: id,
                        postTitle : title,
                        post: post,
                        fileUrl: imgSrc,
                        accno: accno,
                        tele: mobile,
                        city: city,
                        slug: slug,
                        published: published
    
                    })
                        .then((Response)=>{
                        if(Response.data.StatusCode==201){
                            console.log('Post Updated Successfully')
                            this.setState({
                                title: '',
                                post: '',
                                selectedFile: '',
                                id: '',
                                imgSrc: '',
                                accno: '',
                                mobile:'',
                                city:'',
                                slug:'',
                                published: published
                            })
                        }
                        })
                        .catch((error)=>{
                            console.log(error)
                        })
                }      
            }
           
        }

        fileChangeHandler = (event)=>{
            this.setState({
                selectedFile:event.target.files[0]
            })
            
        }
    render(){
        const { loggedinUser,imgSrc, published, isLoading } = this.state;
        
        if(isLoading) {
            return(
                <div className="loader">
                    <ul className="ul-loader">
                    <li className="li-loader"></li>
                    <li className="li-loader"></li>
                    <li className="li-loader"></li>
                    <li className="li-loader"></li>
                    <li className="li-loader"></li>
                    </ul>
                    <style jsx>{instyles}</style> 
                </div>
                )
            }
        else{
            return(
                <div className="container">
                    <div className="status-bar">
                        <div className="inner-status-bar">
                            Tell us your Story
                        </div>
                    </div>
                    <div className="author-pane">
                        <div className="inner-author-pane">
                            By {loggedinUser.loginuser}
                        </div>
                        {loggedinUser.roleId == "1" ?
                            published == "Pending" ?
                            <div className="button" onClick ={(event)=>this.handleSubmit(event)}>Approve</div>
                            :
                            <div className="button" onClick ={(event)=>this.handleSubmit(event)}>Publish</div>
                        :
                        <div className="button" onClick ={(event)=>this.handleSubmit(event)}>Publish</div>
                        }
                    </div>
                    {loggedinUser.roleId != "1" ?
                        <div className="title">
                            <div className="inner-title">
                                <input type="text" name="title" value={this.state.title} placeholder="Title" className="title-text" 
                                onChange={(event)=>this.handleInputChange(event)} />
                            </div>                
                        </div>
                    :
                    <div>
                        <div className="title">
                            <div className="inner-title">
                                <input type="text" name="title" value={this.state.title} placeholder="Title" className="title-text" 
                                onChange={(event)=>this.handleInputChange(event)} />
                            </div>                
                        </div>
                        <div className="slugdiv">
                            <div className="inner-slugDiv">
                                <input type="text" name="slug" value={this.state.slug} placeholder="Title" className="input-extradet" 
                                onChange={(event)=>this.handleInputChange(event)} />
                            </div>                
                        </div>
                    </div>
                    }          
                    <div className="post-details">
                        <div className="buttonDiv">
                            <button className="btn">
                                <FontAwesomeIcon icon={ faCamera }/>
                            </button>
                            <input type="file" name="myfile" className="fileupload"   title="Add an image" 
                            onChange={(event)=>this.fileChangeHandler(event)}/>
                        </div>
                        <div className="inner-post-details">
                            <textarea name="post" value={this.state.post} placeholder="your story..." onChange={(event)=>this.handleInputChange(event)}/>
                        </div>
                    </div>
                    <div className="extradet">
                        <div className="inner-extradet">
                            <input type="text" name="accno" value={this.state.accno} placeholder="Account Number" 
                                className="input-extradet" onChange={(event)=>this.handleInputChange(event)} />
                        </div>
                        <div className="inner-extradet">
                            <input type="text" name="mobile" value={this.state.mobile} placeholder="Telephone Number" 
                                className="input-extradet" onChange={(event)=>this.handleInputChange(event)} />
                        </div>
                        <div className="inner-extradet">
                            <input type="text" name="city" value={this.state.city} placeholder="City" 
                                className="input-extradet" onChange={(event)=>this.handleInputChange(event)} />
                        </div>                
                    </div>
                    <div className="imgInnerDiv">
                        <div className="imgOuterDiv">
                            <img src={imgSrc} alt="" className="card__image" />
                        </div> 
                    </div>  
                    <style jsx>{styles}</style>
                </div>
            )
        }
    }       
}

export default withLayout(editPost)