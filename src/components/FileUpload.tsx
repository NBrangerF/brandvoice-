import React, { useRef, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';
import { useBrandAsset } from '../context/BrandAssetContext';

export const FileUpload: React.FC = () => {
  const { restoreBackup } = useBrandAsset();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      // Smart import: detect if it's a backup array or single document
      if (Array.isArray(json)) {
        // It's a backup file (array of documents)
        if (json.length === 0) {
          alert('备份文件为空。');
          return;
        }
        // Validate first item has proper structure
        if (!json[0].document || !json[0].sections) {
          alert('备份结构错误。每个文档必须包含 "document" 和 "sections" 字段。');
          return;
        }
        restoreBackup(json);
      } else {
        // It's a single document
        if (!json.document || !json.sections) {
          alert('文件结构错误。文件必须包含 "document" 和 "sections" 字段。');
          return;
        }
        restoreBackup(json);
        alert(`数据导入成功：${json.document.title}`);
      }
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      alert('文件解析失败，请检查文件格式。');
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={triggerUpload}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium"
      >
        <Upload size={20} />
        <span>导入数据</span>
      </button>
    </>
  );
};
