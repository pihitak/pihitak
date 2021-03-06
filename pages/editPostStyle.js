import css from 'styled-jsx/css'; 

export default css`
.container{
    display: flex;
    flex-direction: column;
}
.status-bar{
    box-sizing: border-box;
    padding-right: 20px;
    padding-left: 20px;                     
    margin-right: auto;
    margin-left: auto;
    height: 100px;     
}
.inner-status-bar{
    padding-top: 40px;
    font-size: 1.5rem;
    line-height: 35px!important;
    border-bottom: 1px solid!important;
    color: #0000008a;
    position: relative!important;
    width: 740px!important;
    padding-bottom: 10px;
}
.author-pane{
    padding-right: 20px;
    padding-left: 20px; 
    margin-right: auto;
    margin-left: auto;
    width: 740px!important;
    color: #000000ad;
    margin-bottom: 20px;
}
.inner-author-pane{
    padding: 10px 0;
    color: #000;
    position: absolute;
}
.button{
    border-radius: 4px;
    background-color: #4bc970;
    padding: 0.6em;
    // margin-top: 1em;
    border: none;
    color: #FFF;
    font-weight: 600;
    text-align: center;
    width: 4rem;
    cursor: pointer;
    overflow: hidden;
    float: right;
}
textarea{
    width: 100%;
    border-style: none; 
    border-color: Transparent; 
    overflow: auto; 
//     resize: vertical;
//     max-height: 300px; 
//     min-height: 200px;
 }
.title{
    padding-right: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 740px;
    border-left: 1px solid #0000008a;
    resize: vertical;
}
.inner-title{
    padding-right: 20px;
    padding-left: 10px;
    width: 100%;
    margin: 0 auto;
}
.title-text{
    font-size: 30px;
}
.post-details{
    margin-top: 30px;
    display:flex;
    flex-direction:row;
}
.buttonDiv{
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-left: 280px;
    margin-right: 30px;
    }
}
.btn{
    border: 1px solid rgba(0,0,0,.68);
    color: #000;
    background-color: white;
    /* padding: 8px 20px; */
    border-radius: 100%;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    width: 40px;
    line-height:37px;
    
}
.fileupload{
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor:pointer;
}
.inner-post-details{
    width: 740px;
}
.post-text{
    font-size: 24px;
    width: 100%;
    border-style: none; 
    border-color: Transparent; 
    overflow: auto; 
    resize: vertical;
    max-height: 300px; 
    min-height: 200px;
}
.imgInnerDiv{
    width: 540px;
    display: flex;
    align-self: center;
}
.imgOuterDiv{
    height: 250px;
    overflow: hidden;
    padding: 10px 0 10px 0;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    display: inline-block;
}
.card__image{
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0.25rem 0.25rem;
    -webkit-filter: contrast(70%);
            filter: contrast(70%);
    overflow: hidden;
    position: relative;
    transition: -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
    transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
    transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
    // to auto-resize an image
    width:100%;
    height: 100%;
    object-fit: fill;
}

`;