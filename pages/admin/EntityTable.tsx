import React from 'react';
import Button from '../../components/common/Button';
import { PageSessionData } from '../../types';
import { useTranslation } from '../../i18n/I18nContext';

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

interface EntityTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onCreate?: () => void;
  onEdit: (item: T) => void;
  onDelete?: (item: T) => void;
  hideCreate?: boolean;
  hideDelete?: boolean;
  editButtonText?: string;
  createButtonText?: string;
  onPublish?: (item: T) => void;
  onShare?: (item: T) => void;
  onManageCodes?: (item: T) => void;
  onRevoke?: (id: string) => void;
  onVerify?: (accessCode: string) => void;
  onTest?: (item: T) => void;
}

const EntityTable = <T extends { id: string }>({
  title,
  data,
  columns,
  onCreate,
  onEdit,
  onDelete,
  hideCreate,
  hideDelete,
  editButtonText,
  createButtonText,
  onPublish,
  onShare,
  onManageCodes,
  onRevoke,
  onVerify,
  onTest,
}: EntityTableProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        {!hideCreate && onCreate && (
            <Button onClick={onCreate} size="sm">
            <i className="material-icons-round text-base mr-1.5">add</i>
            {createButtonText || t('adminPage.entityTable.createNew')}
            </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {columns.map(col => <th key={col.header} className="p-3 font-semibold">{col.header}</th>)}
              <th className="p-3 font-semibold text-right">{t('adminPage.entityTable.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map(item => (
              <tr key={item.id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                {columns.map(col => <td key={col.header} className="p-3 whitespace-nowrap">{col.accessor(item)}</td>)}
                <td className="p-3 whitespace-nowrap text-right space-x-1">
                   {onPublish && (
                      <Button onClick={() => onPublish(item)} size="sm" variant="outline" className="!px-2 !py-1 text-xs">{t('common.publish')}</Button>
                   )}
                   {onShare && (
                       <Button onClick={() => onShare(item)} size="sm" variant="outline" className="!px-2 !py-1 text-xs">{t('common.share')}</Button>
                   )}
                   {onManageCodes && (
                       <Button onClick={() => onManageCodes(item)} size="sm" variant="outline" className="!px-2 !py-1 text-xs">{t('adminPage.entityTable.manageCodes')}</Button>
                   )}
                   {onRevoke && (
                        <Button onClick={() => onRevoke(item.id)} size="sm" variant="danger" className="!px-2 !py-1 text-xs">{t('common.revoke')}</Button>
                   )}
                   {onVerify && (item as unknown as PageSessionData).accessCode && (
                        <Button onClick={() => onVerify((item as unknown as PageSessionData).accessCode!)} size="sm" variant="outline" className="!px-2 !py-1 text-xs">{t('common.verify')}</Button>
                   )}
                   {onTest && (
                        <Button onClick={() => onTest(item)} size="sm" variant="secondary" className="!px-2 !py-1 text-xs" title={t('adminPage.entityTable.sendTestEmail')}>
                            <i className="material-icons-round text-base">send</i>
                        </Button>
                   )}
                  <Button onClick={() => onEdit(item)} size="sm" variant="secondary" className="!px-2 !py-1 text-xs">
                    {editButtonText || t('adminPage.entityTable.viewEdit')}
                  </Button>
                  {!hideDelete && onDelete && (
                     <Button onClick={() => onDelete(item)} size="sm" variant="danger" className="!px-2 !py-1 text-xs">
                        {t('common.delete')}
                    </Button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-6 text-slate-500">
                  {t('adminPage.entityTable.noData', { title: title.toLowerCase() })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntityTable;