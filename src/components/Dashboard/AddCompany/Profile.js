import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormFile,
  InputGroup,
} from "react-bootstrap";
import { useAddContext } from "../AddCompanyContext";

import firebase from "firebase";

import "./add-company.css";

function Profile() {
  const { file, setFile, setCurrentDocID } = useAddContext();

  const [validatedProfile, setValidatedProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const companyNameRef = useRef();
  const companyDescriptionRef = useRef();
  const onFileChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    var file = e.target.files[0];
    setFile(file);
  };

  const uploadImageCloud = async () => {
    try {
      const fileRef = firebase.storage().ref().child(file.name);
      await fileRef.put(file);
      var url = await fileRef.getDownloadURL();
      addCompany(url);
    } catch (e) {
      console.log(e);
    }
  };

  const addCompany = (url) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("companies")
      .add({
        photo: url,
        companyName: companyNameRef.current.value,
        companyDescription: companyDescriptionRef.current.value,
        status: true,
      })
      .then((docRef) => {
        setCurrentDocID(docRef.id);
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    uploadImageCloud();
    setValidatedProfile(true);
  };

  return (
    <Form
      noValidate
      validated={validatedProfile}
      onSubmit={handleSubmitProfile}
    >
      <Form.Group>
        <Form.Label className="add-company-form-text-label">
          Company logo
        </Form.Label>

        <FormFile
          required
          className="add-company-logo"
          style={{
            backgroundImage: file && `url(${URL.createObjectURL(file)})`,
          }}
        >
          {/* <GoPlus id="add-image-logo" /> */}

          <Form.File.Input
            accept="image/x-png,image/gif,image/jpeg"
            // required
            onChange={onFileChange}
          />
        </FormFile>
      </Form.Group>

      <Form.Group>
        <Form.Label className="add-company-form-text-label">
          Company Name
        </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Lorem company"
          className="add-company-input"
          ref={companyNameRef}
          name="company-name"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="add-company-form-text-label">
          Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Company description"
          className="add-company-input"
          required
          name="company-description"
          ref={companyDescriptionRef}
        />
      </Form.Group>

      <Button type="submit" className="add-company-submit-button mb-5 mt-4">
        Save profile
      </Button>
    </Form>
  );
}

export default Profile;
