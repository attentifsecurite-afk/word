import { RefObject } from 'react';

interface PageAreaProps {
  editorRef: RefObject<HTMLDivElement>;
  onInput: () => void;
}

export default function PageArea({ editorRef, onInput }: PageAreaProps) {
  return (
    <div className="flex-1 overflow-auto bg-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page */}
        <div className="bg-white shadow-lg rounded-sm min-h-[1100px] p-16 page-area">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="editor-content w-full h-full min-h-[1000px] outline-none text-gray-800 leading-relaxed"
            onInput={onInput}
            spellCheck
            style={{ wordBreak: 'break-word' }}
          >
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              Commencez à écrire votre document ici...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
