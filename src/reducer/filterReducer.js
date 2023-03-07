const filterProducts=(state,action)=>
{
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
          let priceArr=action.payload.map((item)=>
          {
               return item.price;
          })
          let maxPrice=Math.max(...priceArr)
          console.log(priceArr)
          return {
            ...state,
            filter_products: [...action.payload],
            all_products: [...action.payload],
            filters:{...state.filters,maxPrice,price:maxPrice}
          };
    
        case "SET_GRID_VIEW":
          return {
            ...state,
            grid_view: true,
          };
          case "SET_LIST_VIEW":
            return {
              ...state,
              grid_view: false,
            };
            case "GET_SORT_VALUE":
              // let userSortValue=document.getElementById("sort");
              // let sort_value=userSortValue.options[userSortValue.selectedIndex].value;

              // console.log(sort_value)
              return {
                ...state,
              sorting_value:action.payload,
              };
              case "SORTING_PRODUCTS":
                let newSortData;
                // let tempSortProduct = [...action.payload];
          
                const { filter_products, sorting_value } = state;
                let tempSortProduct = [...filter_products];
          
                const sortingProducts = (a, b) => {
                  if (sorting_value === "lowest") {
                    return a.price - b.price;
                  }
          
                  if (sorting_value === "highest") {
                    return b.price - a.price;
                  }
          
                  if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                  }
          
                  if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                  }
                };
          
                newSortData = tempSortProduct.sort(sortingProducts);
          
                return {
                  ...state,
                  filter_products: newSortData,
                };
                case "UPDATE_FILTERS_VALUE":
                  const{name,value}=action.payload
                  return {
                    ...state,
                    filters:{...state.filters,[name]:value},
                    
                  };
                  case "FILTER_PRODUCTS":
                    let {all_products}=state;
                    let tempFilterProduct=[...all_products]
                    const{text,category,company,color,price}=state.filters
                    if(text)
                    {
                        tempFilterProduct=tempFilterProduct.filter((currElem)=>
                        {
                            return currElem.name.toLowerCase().includes(text)
                        })
                    }
                    if(category!=="All")
                    {
                      tempFilterProduct=tempFilterProduct.filter((currElem)=>
                      {
                        return currElem.category===category
                      })
                      
                    }
                    if(company!=="All")
                    {
                      tempFilterProduct=tempFilterProduct.filter((currElem)=>
                      {
                        return currElem.company.toLowerCase()===company.toLowerCase()
                      })
                      
                    }
                    if(color!=="All")
                    {
                      tempFilterProduct=tempFilterProduct.filter((currElem)=>
                      
                         currElem.colors.includes(color)
                      )
                      
                    }
                    if(price)
                    {
                      tempFilterProduct=tempFilterProduct.filter((currElem)=>
                      
                         currElem.price<=price
                      )
                      
                    }
                    return {
                      ...state,
                      filter_products:tempFilterProduct,
                      
                    };
                    case "CLEAR_FILTERS":
                      return{
                        ...state,
                        filters:{
                          ...state.filters,
                          text:"",
                          category:"All",
                          company:"All",
                          color:"All",
                          price:0,
                          maxPrice:0,
                          minPrice:state.filters.maxPrice

                        }

                      }


                default:
                    return  state;
        }
}
export default filterProducts