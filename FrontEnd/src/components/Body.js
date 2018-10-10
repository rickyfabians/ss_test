import React from 'react';
import './Body.css';
import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-simple-infinite-scroll'


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      allData:[],

      //checkbox
      mini:true,
      midi:true,
      maxi:true,

      //price range
      selected:"",

      isLoading: true,
      cursor: 0

    };
    this.filterProduct = this.filterProduct.bind(this)
  }

  componentDidMount() {
    this.getProduct();
  }

   getProduct(){
    //Call API
    console.log("@CALL API - get data")

    //InfiniteScroll

    // this.setState({ isLoading: true, error: undefined })
    // fetch(`https://api.example.com/v1/items?from=${this.state.cursor}`)
    //   .then(res => res.json())
    //   .then(
    //     res => {
    //       this.setState(state => ({
    //         listOfProduct: [...state.items, ...res.items],
    //         cursor: res.cursor,
    //         isLoading: false
    //       }))
    //     },
    //     error => {
    //       this.setState({ isLoading: false, error })
    //     }
    // )

    //End of InfiniteScroll

    fetch('http://localhost:4000/api/product/getProduct')
      .then(response => response.json().then((responseJson) => {
        console.log("@FETCH - success")
        let status = responseJson.code;
        if(status == 200){
            this.setState({
              listOfProduct: Object.values(responseJson.data.listdata),
              allData: Object.values(responseJson.data.listdata)
            })
            console.log(responseJson.data.listdata)
        }
      }).catch(function(ex) {
        console.log("@FETCH - fail")
            console.log('parsing failed', ex)
      }))
      
  }

  render() {
    console.log("@RENDER")
    return (
    <div className="main">
        <main role="main" className="container-fluid products" >
            <div className="row">
                <div className="col-sm-2 mt-4 ">
                    <div className="rounded card border-0 p-3 filter" >
                      <form>
                        <div className="form-group" onChange={this.changeCategory.bind(this)}  >
                        <label >Kategori</label>    
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="mini" />Mini Dress
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="midi"/>Midi Dress
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" name="midi"/>Maxi Dress
                              </label>
                            </div>
                        </div>
                        <div className="border-top my-3"></div>
                        <div className="form-group">
                            <label >Rentang Harga</label>    
                            <select className="form-control form-control-sm" name="selected" onChange={this.changeCategory.bind(this)} >
                                <option name="all" value="all">Semua Harga</option>
                                <option name="50" value="<50">Di Bawah 50 Ribu</option>
                                <option name="50-100" value="50-100">50 - 100 Ribu</option>
                                <option name="100-150" value="100-150">100 - 150 Ribu</option>
                                <option name="150" value=">150">Di Atas 150 Ribu</option>
                            </select>
                        </div>
                        <div className="border-top my-3"></div>
                        <div className="form-group">
                        <label >Pilih Warna</label>    
                            <div className="form-check" >
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>Putih
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>Hitam
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>Biru
                              </label>
                            </div>
                        </div>
                        <div className="border-top my-3"></div>
                        <div className="form-group">
                        <label >Ukuran</label>    
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>M
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>L
                              </label>
                            </div>
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" value=""/>XL
                              </label>
                            </div>
                        </div>
                        </form>
                        <button type="button" className="btn btn-danger btn-sm"  onClick={this.filterProduct}>Filter</button>
                    </div> 
                </div>
                <div className="rounded col-sm-10 mt-4 bg-white body-listProducts">
                    <div className="row mt-3">
                      <div className="col-sm-6">
                        <pre className="align-baseline">
                          <a href="#" className="text-secondary">wanita</a>
                          <span className="text-secondary"> > </span>
                          <a href="#" className="text-secondary">kategori</a>
                          <span className="text-secondary"> > </span>
                          <a href="#"  className="text-secondary">dress</a>
                          </pre>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-inline float-right">
                            <label className="mr-sm-2"><b>Atur Berdasarkan</b></label>    
                              <select className="form-control form-control-sm">
                                  <option>Terbaru</option>
                                  <option>Trending</option>
                                  <option>Popularitas</option>
                                  <option>Termahal</option>
                                  <option>Termurah</option>
                                  <option>Terlaris</option>
                                  <option>Rekomendasi</option>
                              </select>
                          </div> 
                      </div>
                      </div>             
                    <div className="row mt-3">
                    {
                      //InfiniteScroll

                      /* <InfiniteScroll
                      throttle={100}
                      threshold={300}
                      isLoading={this.state.isLoading}
                      hasMore={!!this.state.cursor}
                      onLoadMore={this.loadMore}
                    >
                      {this.state.listOfProduct.length > 0 
                        ? this.state.listOfProduct.map(item => (
                           
                          ))
                        : null}
                    </InfiniteScroll>
                    {this.state.isLoading && (
                      <MyLoadingState /> */

                      //End of InfiniteScroll
                    }
                      
                      <LazyLoad >
                        {
                          //looping data
                          this.state.listOfProduct ? 
                          this.state.listOfProduct.map((item, id) => {
                              return <div className="col-sm-4" id={id}>
                                <div className="card" >
                                    <img className="card-img-top" height="300" src={item.image} alt="Card image" />
                                    <div className="card-body">
                                      <h6 className="card-title">{item.name}</h6>
                                      <p className="card-text" >
                                      <a className="rounded text-secondary bg_lightgrey">{item.stock}</a><br/>
                                        Rp. {item.price}
                                        <img className="float-right" height="25" src="https://s-media-cache-ak0.pinimg.com/originals/f3/32/27/f33227ffe2a3108831b2977c9e781404.png"/>
                                      </p>
                                    </div>
                                </div>
                            </div>
                        }) : this.renderLoading()
                        }
                    </LazyLoad>
                    </div>
                </div>
            </div>
        </main>
    </div>
    )
  }

  filterProduct(){
    var result=[];
    if(this.state.mini){
      console.log("@FILTER CHECKCBOX : mini ")
        var mini = this.state.allData.filter(function(word){
          return word.subcategory == "mini" 
        });
        result = result.concat(mini);
    }
    if(this.state.midi){
      console.log("@FILTER CHECKCBOX : midi ")
        var midi = this.state.allData.filter(function(word){
          return word.subcategory == "midi" 
        });
        result = result.concat(midi);
    }
    if(this.state.maxi){
      console.log("@FILTER CHECKCBOX : maxi ")
          var maxi = this.state.allData.filter(function(word){
            return word.subcategory == "maxi" 
          result = result.concat(maxi);
        });
    }
    result.length == 0 ? result = this.state.allData: console.log("No Filter By Category")
    if(this.state.selected == "<50"){
      console.log("@FILTER BY RANGE : dibawah 50")
      result = result.filter(function(data){
        return parseInt(data.price) < 50000
      });
      result = result.concat(maxi);
    }  else if(this.state.selected == "50-100"){
      console.log("@FILTER BY RANGE : antara 50 - 100")
      result = result.filter(function(data){
        return parseInt(data.price) > 50000 && parseInt(data.price) < 100000 
      }); 
    } else if(this.state.selected == "100-150"){
      console.log("@FILTER BY RANGE : antara 100 - 150")
      result = result.filter(function(data){
        return parseInt(data.price) > 100000 && parseInt(data.price) < 150000 
      }); 
    } else if(this.state.selected== ">150"){
      console.log("@FILTER BY RANGE : di atas 150")
      result = result.filter(function(data){
        return parseInt(data.price) > 150000
      });
    }

    this.setState({listOfProduct:result})
}

  changeCategory(e){
    if(e.target.name == "mini"){
      console.log("@checkbox mini : "+e.target.checked)
      this.setState({mini: e.target.checked});
    }
    if(e.target.name == "midi"){
      console.log("@checkbox midi: "+e.target.checked)
        this.setState({midi: e.target.checked});
    }
    if(e.target.name == "maxi"){
      console.log("@checkbox maxi: "+e.target.checked)
        this.setState({maxi: e.target.checked});
    }

  }

  changeRange(e){
    console.log("@CHANGE RANGE")
    this.setState({selected:e.target.value})
  }

  renderLoading () {
    return <div>Loading...</div>;
  }
  renderNotfound() {
    return <div>No Item Found...</div>;
  }
}

export default Body;