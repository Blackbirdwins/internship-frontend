import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { STATUS, PRIORITY, CATEGORIES } from '../data/items';
import { validateItem } from '../utils/validate';

const empty = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  category: 'Personal',
};

export default function ItemForm({ initialData, onSubmit, onCancel }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || empty,
  });

  useEffect(() => {
    reset(initialData || empty);
  }, [initialData, reset]);

  const submit = (data) => {
    // Task 6 — manual validation on top of react-hook-form rules
    const extraErrors = validateItem(data);
    if (Object.keys(extraErrors).length > 0) return;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="form">
      {/* TITLE */}
      <div className="form-group">
        <label>Title *</label>
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Title is required',
            minLength: { value: 3, message: 'Min 3 characters' },
            maxLength: { value: 50, message: 'Max 50 characters' },
          }}
          render={({ field }) => (
            <input
              {...field}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter title..."
            />
          )}
        />
        {errors.title && <span className="form-error">{errors.title.message}</span>}
      </div>

      {/* DESCRIPTION */}
      <div className="form-group">
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          rules={{
            maxLength: { value: 200, message: 'Max 200 characters' },
          }}
          render={({ field }) => (
            <textarea
              {...field}
              className={`form-input ${errors.description ? 'error' : ''}`}
              placeholder="Optional description..."
              rows={3}
            />
          )}
        />
        {errors.description && <span className="form-error">{errors.description.message}</span>}
      </div>

      {/* STATUS + PRIORITY */}
      <div className="form-row">
        <div className="form-group">
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field} className="form-input">
                {STATUS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <select {...field} className="form-input">
                {PRIORITY.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Category</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <select {...field} className={`form-input ${errors.category ? 'error' : ''}`}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        />
        {errors.category && <span className="form-error">{errors.category.message}</span>}
      </div>

      {/* ACTIONS */}
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Item' : 'Create Item'}
        </button>
      </div>
    </form>
  );
}