import {Component} from 'react'
import withLayout from '../components/Layouts/Layout'
import axios from 'axios'
import jscookie from 'js-cookie'
import styles from './editPostStyle'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCamera from '@fortawesome/fontawesome-free-solid/faCamera'


class editPost extends Component{
    
        state={
            loggedinUser: '',
            title: '',
            post: '',
            imgSrc: '',
            id: '',
            selectedFile:''
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
                    imgSrc: Response.data.Items[0].PostSrc
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
            const formData = new FormData()
            formData.append('file',this.state.selectedFile)
            formData.append('upload_preset', "iv3w5ot5")
            const config = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            };
            if(this.state.selectedFile!=''){
                axios.post('https://api.cloudinary.com/v1_1/myprojectx/image/upload',formData,config)
                .then((Response)=>{
                    axios.post('http://api.pihitak.com/edit-post',{
                    postId: this.state.id,
                    postTitle : this.state.title,
                    post: this.state.post,
                    fileUrl: Response.data.url
                })
                    .then((Response)=>{
                    if(Response.data.StatusCode==201){
                        console.log('Post Updated Successfully')
                        this.setState({
                            title: '',
                            post: '',
                            selectedFile: '',
                            id: '',
                            imgSrc: ''
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
                    postId: this.state.id,
                    postTitle : this.state.title,
                    post: this.state.post,
                    fileUrl: this.state.imgSrc
                })
                    .then((Response)=>{
                    if(Response.data.StatusCode==201){
                        console.log('Post Updated Successfully')
                        this.setState({
                            title: '',
                            post: '',
                            selectedFile: '',
                            id: '',
                            imgSrc: ''
                        })
                    }
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
            }      
        }

        fileChangeHandler = (event)=>{
            this.setState({
                selectedFile:event.target.files[0]
            })
            
        }
    render(){
        const { loggedinUser,imgSrc } = this.state;
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
                    <div className="button" onClick ={(event)=>this.handleSubmit(event)}>Publish</div>
                </div>
                <div className="title">
                    <div className="inner-title">
                    <textarea type="text" name="title" value={this.state.title} placeholder="Title" className="title-text" 
                    onChange={(event)=>this.handleInputChange(event)} />
                    </div>                
                </div>
                <div className="post-details">
                    <div className="buttonDiv">
                        <button className="btn">
                            <FontAwesomeIcon icon={ faCamera }/>
                        </button>
                        <input type="file" name="myfile" className="fileupload"   title="Add an image" 
                        onChange={(event)=>this.fileChangeHandler(event)}/>
                    </div>
                    <div className="inner-post-details">
                        <textarea name="post" value={this.state.post} placeholder="your story..."  className="post-text" onChange={(event)=>this.handleInputChange(event)}/>
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

export default withLayout(editPost)