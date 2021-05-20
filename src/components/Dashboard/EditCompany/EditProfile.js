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
import { useAdminContext } from "../../context/AdminContext";

import firebase from "firebase";

function EditProfile() {
  const { setActiveButton, companyToEdit, setCompanyToEdit } =
    useAdminContext();

  const [validatedProfile, setValidatedProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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
      updateCompany(url);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeComapanyValue = (val, type) => {
    setCompanyToEdit({ ...companyToEdit, [type]: val });
  };

  const updateCompany = (url) => {
    setLoading(true);
    firebase
      .firestore()
      .collection("companies")
      .doc(companyToEdit.id)
      .set(
        {
          photo: url,
          companyName: companyToEdit.companyName,
          companyDescription: companyToEdit.companyDescription,
          status: true,
        },
        { merge: true }
      )
      .then(() => {
        setActiveButton("services");
      })
      .catch((e) => console.log(e));
  };

  const handleSubmitProfile = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    file ? uploadImageCloud() : updateCompany(companyToEdit.photo);
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
            backgroundImage: `url(${
              file ? URL.createObjectURL(file) : companyToEdit.photo
            })`,
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
          name="company-name"
          value={companyToEdit && companyToEdit.companyName}
          onChange={(e) => onChangeComapanyValue(e.target.value, "companyName")}
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
          value={companyToEdit && companyToEdit.companyDescription}
          onChange={(e) =>
            onChangeComapanyValue(e.target.value, "companyDescription")
          }
        />
      </Form.Group>

      <Button type="submit" className="add-company-submit-button mb-5 mt-4">
        Save profile
      </Button>
    </Form>
  );
}

export default EditProfile;
