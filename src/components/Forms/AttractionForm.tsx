import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import {
  Modal,
  Button,
  TextInput,
  TextArea,
  Select,
  // DatePicker,
  FilePreview,
} from "@gravity-ui/uikit";
import { Attraction, AttractionStatus } from "../GlobalTypes/Types";
import { useEffect, useState } from "react";

export const AttractionForm = observer(() => {
  const { uiStore, attractionsStore } = useStores();
  const [formData, setFormData] = useState<Partial<Attraction>>({
    name: "",
    description: "",
    rating: 3,
    location: "",
    coordinates: { lat: 0, lng: 0 },
    status: "planned",
    image: "",
  });

  useEffect(() => {
    if (uiStore.currentAttractionId) {
      const attraction = attractionsStore.attractions.find(
        (a) => a.id === uiStore.currentAttractionId
      );
      if (attraction) {
        setFormData(attraction);
      }
    } else {
      setFormData({
        name: "",
        description: "",
        rating: 3,
        location: "",
        coordinates: { lat: 0, lng: 0 },
        status: "planned",
        image: "",
      });
    }
  }, [uiStore.currentAttractionId, attractionsStore.attractions, setFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (uiStore.currentAttractionId) {
      // Для обновления используем Partial<Attraction>
      const updateData: Partial<Attraction> = {
        name: formData.name,
        description: formData.description,
        rating: formData.rating,
        location: formData.location,
        coordinates: formData.coordinates,
        status: formData.status,
        image: formData.image,
      };
      attractionsStore.updateAttraction(
        uiStore.currentAttractionId,
        updateData
      );
    } else {
      // Для создания используем Omit<Attraction, ...>
      const newAttractionData: Omit<Attraction, "id" | "addedAt" | "mapLink"> =
        {
          name: formData.name || "",
          description: formData.description || "",
          rating: formData.rating || 3,
          location: formData.location || "",
          coordinates: formData.coordinates || { lat: 0, lng: 0 },
          status: formData.status || "planned",
          image: formData.image || "",
        };
      attractionsStore.addAttraction(newAttractionData);
    }

    uiStore.closeForm();
  };

  // const createFileObject = (url: string) => ({
  //   name: "Preview",
  //   size: 0,
  //   lastModified: Date.now(),
  //   type: "image/*",
  //   webkitRelativePath: "",
  //   arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  //   slice: () => new Blob(),
  //   stream: () => new ReadableStream(),
  //   text: () => Promise.resolve(""),
  // });

  const createFileObject = (imageUrl: string): File => {
    // Создаем Blob с пустым содержимым, так как нам нужно только отображение по URL
    const blob = new Blob([], { type: "image/jpeg" });

    const file = new File([blob], "preview.jpg", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    return Object.assign(file, { preview: imageUrl });
  };

  return (
    <Modal open={uiStore.isFormOpen} onClose={() => uiStore.closeForm()}>
      <form onSubmit={handleSubmit} className="attraction-form">
        <div className="attraction-form__header">
          <h2>
            {uiStore.currentAttractionId ? "Редактировать" : "Добавить"}{" "}
            достопримечательность
          </h2>
        </div>

        <div className="attraction-form__body">
          <TextInput
            label="Название"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            hasClear
            size="l"
            // required
          />

          <TextArea
            // label="Описание"
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            minRows={3}
            size="l"
          />

          <div className="attraction-form__row">
            <TextInput
              label="Местоположение"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              hasClear
              size="l"
              // required
            />

            <Select
              label="Статус"
              value={[formData.status || "planned"]}
              onUpdate={(val) =>
                setFormData({ ...formData, status: val[0] as AttractionStatus })
              }
              options={[
                { value: "planned", content: "В планах" },
                { value: "visited", content: "Осмотрена" },
              ]}
              size="l"
            />
          </div>

          <div className="attraction-form__row">
            <TextInput
              label="Широта"
              type="number"
              value={formData.coordinates?.lat.toString() || "0"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates!,
                    lat: parseFloat(e.target.value) || 0,
                  },
                })
              }
              size="l"
            />

            <TextInput
              label="Долгота"
              type="number"
              value={formData.coordinates?.lng.toString() || "0"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates!,
                    lng: parseFloat(e.target.value) || 0,
                  },
                })
              }
              size="l"
            />
          </div>

          <div className="attraction-form__row">
            <Select
              label="Рейтинг"
              value={[formData.rating?.toString() || "3"]}
              onUpdate={(val) =>
                setFormData({ ...formData, rating: parseInt(val[0]) })
              }
              options={[
                { value: "1", content: "1" },
                { value: "2", content: "2" },
                { value: "3", content: "3" },
                { value: "4", content: "4" },
                { value: "5", content: "5" },
              ]}
              size="l"
            />

            <TextInput
              label="URL изображения"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              hasClear
              size="l"
            />
          </div>

          {formData.image && (
            <FilePreview
              file={createFileObject(formData.image)}
              imageSrc={formData.image}
              className="attraction-form__preview"
            />
          )}
        </div>

        <div className="attraction-form__footer">
          <Button type="submit" view="action" size="l">
            {uiStore.currentAttractionId ? "Сохранить" : "Добавить"}
          </Button>
          <Button onClick={() => uiStore.closeForm()} size="l">
            Отмена
          </Button>
        </div>
      </form>
    </Modal>
  );
});
