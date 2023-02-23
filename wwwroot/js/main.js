//window.on=function(){
  const burgerIcon = document.querySelector('#burger');
  //const burgerIcon = document.getElementById('#burger');
const navbarMenu = document.querySelector('#nav-links');
//}

  class MyHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `   
      <nav class="navbar has-shadow is-info">
        <div class="navbar-brand">
          <a class="navbar-item" href="index.html">
            <img src="../images/Logo.png" alt="site logo" style="max-height: 70px;" class="py-2 px-2"></img>
          </a>
          <a href="" class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div class="navbar-menu" id="nav-links">
          <div class="navbar-start">
              <a href="/wwwroot/pages/about.html" class="navbar-item">About</a>
              <a href="/wwwroot/pages/news.html" class="navbar-item">News</a>
              <a href="/wwwroot//pages/sessions/session1/contents.html" class="navbar-item">Sessions</a>
              <a href="/wwwroot/pages/team.html" class="navbar-item">Team</a>
              <a href="/wwwroot/pages/heallthprofs.html" class="navbar-item">Health Profs</a>
              <a href="/wwwroot/pages/contact.html" class="navbar-item">Contact</a>
              <a href="/wwwroot/pages/furthersupport.html" class="navbar-item">Further Support</a>
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
                <img src="../images/footer.webp" alt="Footer image containing related helpful links">
                <p>Copyright 2022 Face It | Registered Charity No. 1011222 </p>
                <a href="../pages/terms.html">Terms + Conditions  |  </a>
                <a href="../pages/contact.html">Contact Us</a>
            </div>
        </footer>
  `;
    }
  }
      
  customElements.define('my-footer', MyFooter);