import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Currently only supports choice of theme.
 * @class PreferencesService
 */
@Injectable()
export class PreferencesService {
  constructor(private router: Router) {
    this.setPreferredTheme();
    this.setAccessKeys();
    this.setTableFilterNames();
    this.setTableFilterLabels();
    this.observeDOMChanges();
  }

  /**
   * Stores the theme name in localstorage.
   * @param theme
   */
  setTheme(theme) {
    localStorage.setItem('theme', theme);
    this.removeTheme();
    this.addTheme(theme);
  }

  /**
   * Set users preferred theme if not standard
   */
  setPreferredTheme() {
    const theme = this.getTheme();
    if (theme && theme !== 'standard' && theme !== '') {
      this.setTheme(theme);
    }
  }

  /**
   * Retrieve the theme name from localstorage.
   */
  getTheme() {
    return localStorage.getItem('theme');
  }

  /**
   * Crreate and HTML link in the webpage to link to the css file.
   * @param theme : names the theme. This is the key of the theme filename.
   * E.g. for a_theme, the file will be "/assets/theme/a_theme.css"
   */
  addTheme(theme) {
    const instance = document.getElementById('theme');
    if (theme && theme !== '' && !instance) {
      const head = document.head;
      const link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.id = 'theme';
      link.href = './assets/themes/' + theme + '.css';
      head.appendChild(link);
    }
  }

  /**
   * Unlink the css file from the HTML, if there is a theme link present.
   */
  removeTheme() {
    const instance = document.getElementById('theme');
    if (instance) {
      instance.parentNode.removeChild(instance);
    }
  }

  /**
   * Dynamically set accesskeys for vendor components
   */
  setAccessKeys() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(function() {
          const next = document.getElementsByClassName('ui-paginator-next')[0];
          const prev = document.getElementsByClassName('ui-paginator-prev')[0];
          const first = document.getElementsByClassName(
            'ui-paginator-first'
          )[0];
          const last = document.getElementsByClassName('ui-paginator-last')[0];
          next && next.setAttribute('accesskey', 'n');
          prev && prev.setAttribute('accesskey', 'v');
          first && first.setAttribute('accesskey', ',');
          last && last.setAttribute('accesskey', '.');
        }, 0);
      });
  }

  setTableFilterNames() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(function() {
          const headers = document.querySelectorAll('.ui-sortable-column');
          for (let i = 0; i < headers.length; i++) {
            const title = headers[i].querySelector('.ui-column-title');
            if (title) {
              const name = title.innerHTML;
              const input = headers[i].querySelector('.ui-column-filter');
              input.setAttribute('name', 'Filter by ' + name);
              input.setAttribute('id', 'Filter by ' + name);
            }
          }
        }, 0);
      });
  }

  setTableFilterLabels() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(() => {
          const headers = document.querySelectorAll('.ui-sortable-column');

          for (let i = 0; i < headers.length; i++) {
            const span = headers[i].querySelector('.ui-column-title');
            if (span) {
              const name = span.innerHTML;
              const label = document.createElement('label');

              label.innerHTML = name;
              label.setAttribute('for', 'Filter by ' + name);

              span.parentNode.insertBefore(label, span);
              span.parentElement.removeChild(span);
            }
          }
        }, 0);
      });
  }

  observeDOMChanges() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        setTimeout(() => {
          const nodes = document.querySelectorAll('input, select, textarea');
          for (let i = 0; i < nodes.length; i++) {
            const observer = new MutationObserver(mutations => {
              let errors = this.checkFormErrors();
              if (errors) {
                this.addFormErrorNotification();
              } else {
                this.removeFormErrorNotification();
              }
            });

            observer.observe(nodes[i], {
              attributes: true,
              childList: true,
              characterData: true
            });
          }
        }, 1000);
      });
  }

  checkFormErrors(): boolean {
    let errors = false;
    const nodes = document.querySelectorAll('input, select, textarea');
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains('error')) {
        errors = true;
        break;
      }
    }
    return errors;
  }

  addFormErrorNotification() {
    const notification = document.createElement('div');
    notification.innerHTML =
      'Form contains validation errors, please correct the below errors';
    notification.id = 'formErrorNotification';
    notification.setAttribute('class', 'alert alert-danger');
    const heading = document.getElementById('heading');
    const currentNotification = document.getElementById(
      'formErrorNotification'
    );
    if (heading && !currentNotification) {
      heading.parentNode.insertBefore(notification, heading.nextSibling);
    }
  }

  removeFormErrorNotification() {
    const notification = document.getElementById('formErrorNotification');
    if (notification) {
      notification.parentNode.removeChild(notification);
    }
  }
}
