// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React from "react";
import { FormComponent } from "./FormComponent";

export default class MyForm extends React.Component {
  constructor(props: any) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "NORMAL",
    };
  }

  render() {
    // @ts-ignore
    const { status } = this.state;
    return (
      <>
        {status === "NORMAL" && <FormComponent submitForm={this.submitForm} />}
        {status === "SUCCESS" && (
          <div>Thank you! your message has been sent</div>
        )}
        {status === "ERROR" && (
          <div>
            Sorry, there was an error in sending the message, please refresh the
            page and try again
          </div>
        )}
      </>
    );
  }

  submitForm(ev: any) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
