import React, {memo, useContext, useState} from "react";
import UserContext from "../../context/UserContext";
import {Loader} from "../../ui/Loader";
import {Field} from "../../ui/Field";
import {Upload} from "../../ui/Icon";
import {Button} from "../../ui/Button";
import {apiFetch} from "../../utils/api";
import Gravatar from "react-gravatar";

export function User({onUpdate, setTheme}) {
    const user = useContext(UserContext);

    return <div>
        <h1 className="mt-3 mb-3">Personnal data</h1>
        {user === null ? <Loader/> :
            <UserDetail user={user} onUpdate={onUpdate} setTheme={setTheme}/>}
    </div>
}

const UserDetail = memo(function ({user, onUpdate, setTheme}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async function (e) {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const data = Object.fromEntries(new FormData(form));

        try {
            await onUpdate(user, data);
            window.location.reload(false);
        } catch (e) {
            throw e;
        }
        setLoading(false);
    }

    return <>
        <div className="d-flex align-items-start mb-3">
            <button className="btn btn-primary mr-2" onClick={() => setTheme('navbar-dark bg-dark')}>Dark theme</button>
            <button className="btn btn-primary" onClick={() => setTheme('navbar-dark bg-primary')}>Blue theme</button>
        </div>
        <form className="d-flex align-items-start" onSubmit={handleSubmit}>
            <div className="mr-2 mt-2">{user.email}</div>
            <Field defaultValue={user.fullName} name="fullName" className="mr-2"/>
            <Button type="submit" loading={loading}><Upload/></Button>
        </form>
        <FileUpload onUpdate={onUpdate}/>
    </>
})

function FileUpload({onUpdate}) {
    const user = useContext(UserContext);

    let {fileName, filePath} = user;

    if (!fileName || !filePath) {
        fileName = "default";
    }

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({fileName, filePath});

    const handleSubmit = async function (e) {
        e.preventDefault();

        const data = new FormData();

        data.append('file', file);

        try {
            const res = await apiFetch('/upload', {
                method: 'POST',
                body: data,
            });

            const {fileName, filePath} = res;
            setUploadedFile({fileName, filePath});

            await onUpdate(user, res);
            window.location.reload(false);

        } catch (e) {
            throw e;
        }
    }

    const onChange = function (e) {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    return <>
        {uploadedFile.filePath !== "" ?
            <img className="" src={uploadedFile.filePath} alt={uploadedFile.fileName} width="200" height="auto"/>
            :
            <Gravatar email="" forcedefault="monsterid" size={200} className="CustomAvatar-image"/>
        }


        <form className="custom-file mt-3" onSubmit={handleSubmit}>
            <input type="file" className="custom-file-input" name="file" id="file" onChange={onChange} required/>
            <label className="custom-file-label" htmlFor="file">
                {filename}
            </label>
            <button type="submit" className="btn btn-primary mt-3">Upload</button>
        </form>
    </>
}