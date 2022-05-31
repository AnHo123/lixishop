import { useState, useContext } from "react";
import { ProductListContext } from "./ProductList";

const dataCategory = [
  {
    vnName: "Tất cả sản phẩm",
    enName: "All product",
  },
  {
    vnName: "Bút kẻ chân mày",
    enName: "Eyebrow",
  },
  {
    vnName: "Bút kẻ mắt",
    enName: "Eyeliner",
    listType: [
      {
        vnName: "Bút kẻ nước",
        enName: "Liquid",
      },
      {
        vnName: "Bút kẻ chì",
        enName: "Pencil",
      },
      {
        vnName: "Bút kẻ gel",
        enName: "Gel",
      },
      {
        vnName: "Bút kẻ dạng kem",
        enName: "Cream",
      },
    ],
  },
  {
    vnName: "Phấn mắt",
    enName: "Eyeshadow",
    listType: [
      {
        vnName: "Bảng màu",
        enName: "Palette",
      },
      {
        vnName: "Phấn bút chì",
        enName: "Pencil",
      },
      {
        vnName: "Phấn dạng kem",
        enName: "Cream",
      },
    ],
  },
  {
    vnName: "Kem nền",
    enName: "Foundation",
    listType: [
      {
        vnName: "Che khuyết điểm",
        enName: "Concealer",
      },
      {
        vnName: "Nền dạng nước",
        enName: "Liquid",
      },
      {
        vnName: "Tạo khối",
        enName: "Contour",
      },
      {
        vnName: "Nền dưỡng da",
        enName: "BB CC",
      },
      {
        vnName: "Nền khoáng chất",
        enName: "Mineral",
      },
      {
        vnName: "Phấn bắt sáng",
        enName: "Highlighter",
      },
    ],
  },
  {
    vnName: "Son viền môi",
    enName: "Lip liner",
  },
  {
    vnName: "Son môi",
    enName: "Lipstick",
    listType: [
      {
        vnName: "Son thỏi",
        enName: "Lipstick",
      },
      {
        vnName: "Son bóng",
        enName: "Lip gloss",
      },
      {
        vnName: "Son lì",
        enName: "Lip stain",
      }
    ],
  },
  {
    vnName: "Mascara",
    enName: "Mascara",
  },
  {
    vnName: "Sơn móng tay",
    enName: "Nail polish",
  },
];

function Category() {
  const { setCatogory, setProductType, setCurrentPage, setRerender, rerender } =
    useContext(ProductListContext);
  const [currentCate, setCurrentCate] = useState(0);
  const [currentType, setCurrentType] = useState();

  return (
    <div className="col-lg-3  d-none d-lg-block">
      <span className="category-title py-3 d-block">Danh mục</span>
      <ul className="list-group list-group-main">
        {dataCategory.map((item, index) => (
          <>
            {!item.listType ? (
              <li
                id={index}
                onClick={(e) => {
                  setCurrentCate(e.target.id);
                  setProductType("");
                  setCatogory(item.enName);
                  setCurrentPage(1);
                  setRerender(!rerender);
                }}
                className={`list-group-item no-list-mini list-group-item-${
                  currentCate == index ? "active" : " "
                }`}
              >
                {item.vnName}
                <span className="text-secondary text-eng fs-7">
                  {item.enName}
                </span>
              </li>
            ) : (
              <>
                <li
                  id={index}
                  onClick={(e) => {
                    setCurrentCate(e.target.id);
                    setProductType("");
                    setCatogory(item.enName);
                    setCurrentPage(1);
                    setRerender(!rerender);
                  }}
                  className={`list-group-item has-list-mini list-group-item-${
                    currentCate == index ? "active" : " "
                  }`}
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                >
                  {item.vnName}
                  <span className="text-secondary text-eng fs-7">
                    {item.enName}
                  </span>
                </li>
                <div className="collapse" id={`collapse-${index}`}>
                  <div className="card card-body py-0">
                    <div className="list-group list-group-mini ps-5">
                      {item.listType.map((type, id) => (
                        <a
                          id={id}
                          href="javascript:void"
                          onClick={(e) => {
                            setCurrentType(e.target.id);
                            setCurrentCate(index);
                            setCatogory(item.enName);
                            setProductType(type.enName);
                            setRerender(!rerender);
                          }}
                          className={`list-group-item list-group-item-action list-group-item-${
                            currentType == id && currentCate == index
                              ? "active"
                              : " "
                          }`}
                          aria-current="true"
                        >
                          {type.vnName}
                          <span className="text-secondary text-eng fs-7">
                            {type.enName}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default Category;
