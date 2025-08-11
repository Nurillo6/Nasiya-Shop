import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { API } from '../hooks/getEnv';
import { useParams } from 'react-router-dom';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImage: React.FC<{ imgNames: any, setImgNames: Dispatch<SetStateAction<string[]>> }> = ({ setImgNames, imgNames }) => {
  const { id } = useParams()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (file.status === "done") {
      setImgNames(prev => [...prev, file.response.path]);
    }

    if (file.status === "removed") {
      setImgNames(prev => prev.filter(name => name !== (file.response?.path || file.name)));
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  useEffect(() => {
    if (id && imgNames.length > 0) {
      setFileList(imgNames.map((item: any) => {
        const data = {
          uid: item.id,
          name: `image.${item.name ? item.name.split(".")[1] : item.split(".")[1]}`,
          status: 'done',
          url: `${API}${item.name ? item.name : item}`,
        }
        return data
      }))
    }
  }, [id, imgNames])

  return (
    <>
      <Upload
        action={`${API}/upload`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;