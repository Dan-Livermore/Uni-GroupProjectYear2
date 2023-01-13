class MyHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `   
      <nav class="navbar has-shadow is-primary">
       <div class="navbar-brand">
           <a class="navbar-item" href="index.html">
               <img src="../assets/logo.png" alt="site logo" style="max-height: 70px;" class="py-2 px-2">
           </a>
           <a href="" class="navbar-burger" id="burger">
               <span></span>
               <span></span>
               <span></span>
           </a>
       </div>
   
       <div class="navbar-menu" id="nav-links">
           <div class="navbar-start">
               <a href="about.html" class="navbar-item">About</a>
               <a href="news.html" class="navbar-item">News</a>
               <a href="sessions.html" class="navbar-item">Sessions</a>
               <a href="team.html" class="navbar-item">Team</a>
               <a href="heallthprofs.html" class="navbar-item">Health Profs</a>
               <a href="contact.html" class="navbar-item">Contact</a>
               <a href="furthersupport.html" class="navbar-item">Further Support</a>
           </div>  
           <div class="navbar-end">
               <a href="login.html" class="navbar-item">Log In</a>
           </div>
       </div>
   </nav>
  `;
    }
  }
      
  customElements.define('my-header', MyHeader);


  class MyFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `   
        <footer class="footer has-shadow">
            <div class="content has-text-centered">
                <!--Removed unneccessary text and reorganized sections. Links not added-->
                <img src="../assets/footer.webp" alt="Footer image containing related helpful links">
                <p>Copyright 2022 Face It | Registered Charity No. 1011222 </p>
                <p>Terms & Conditions | ??????????????????</p>
                
            </div>
        </footer>
  `;
    }
  }
      
  customElements.define('my-footer', MyFooter);