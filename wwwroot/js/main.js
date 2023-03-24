

  class MyHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = ` 
      <nav class="navbar has-shadow is-info">
        <div class="navbar-brand">
          <a class="navbar-item" href="/Pages/about.html">
            <img src="/wwwroot/images/logo.png" alt="site logo" style="max-height: 70px;" class="py-2 px-2"></img>
          </a>
          <a href="" class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div class="navbar-menu" id="nav-links">
          <div class="navbar-start">
              <a href="/wwwroot/lib/about.html" class="navbar-item">About</a>
              <a href="/wwwroot/lib/news.html" class="navbar-item">News</a>
              <a href="/wwwroot/lib/sessions/menu.html" class="navbar-item">Sessions</a>
              <a href="/wwwroot/lib/team.html" class="navbar-item">Team</a>
              <a href="/wwwroot/lib/heallthprofs.html" class="navbar-item">Health Profs</a>
              <a href="/wwwroot/lib/contact.html" class="navbar-item">Contact</a>
              <a href="/wwwroot/lib/furthersupport.html" class="navbar-item">Further Support</a>
              <a href="/wwwroot/lib/journal.html" class="navbar-item">Journals</a>
          </div>  
          <div class="navbar-end">
            <a href="/wwwroot/lib/login.html" class="navbar-item">Log In</a>
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
                <img src="/wwwroot/images/footer.webp" alt="Footer image containing related helpful links">
                <p>Copyright 2022 Face It | Registered Charity No. 1011222 </p>
                <a href="/wwwroot/lib/terms.html">Terms + Conditions</a>  |  <a href="/wwwroot/lib/contact.html">Contact Us</a>
                <p>Developed by Team Z</p>
            </div>
        </footer>
  `;
    }
  }
      
  customElements.define('my-footer', MyFooter);