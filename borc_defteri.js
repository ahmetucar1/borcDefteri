const yeniBorc = document.querySelector('.input-borc')
const yeniBorcEkleBtn = document.querySelector('.btn-borc-ekle')
const borcListesi = document.querySelector('.borc-listesi')

yeniBorcEkleBtn.addEventListener('click', borcEkle)
borcListesi.addEventListener('click', borcSilTamamla)
document.addEventListener('DOMContentLoaded', localStorageOku)


function borcSilTamamla(e) {
    const tiklanilanEleman = e.target

    if (tiklanilanEleman.classList.contains('borc-btn-odendi')){
        
        tiklanilanEleman.parentElement.classList.toggle('borc-odendi')
    }
    if (tiklanilanEleman.classList.contains('borc-btn-sil')){

        if(confirm('Emin misiniz?')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol')
            const silinecekBorc = tiklanilanEleman.parentElement.children[0].innerText
            
            localStorageSil(silinecekBorc)
            
            tiklanilanEleman.parentElement.addEventListener('transitionend', function(){
                tiklanilanEleman.parentElement.remove()
            })
        }
        
    }
}

function borcEkle(e) {
    e.preventDefault()
    
    if (yeniBorc.value.length > 0) {
        borcItemOlustur(yeniBorc.value)
        // LocalStorage kaydetme
        localStorageKaydet(yeniBorc.value)
        yeniBorc.value = ''
    } else {
        alert('Boş Borç Ekleyemezsiniz!')
    }
    
}


function localStorageArrayeDonustur() {
    let borclar

    if (localStorage.getItem('borclar') === null) {
        borclar = []
    } else {
        borclar = JSON.parse(localStorage.getItem('borclar'))
    }

    return borclar
}

function localStorageKaydet(yeniBorc) {
    let borclar = localStorageArrayeDonustur()

    borclar.push(yeniBorc)
    localStorage.setItem('borclar', JSON.stringify(borclar))
}

function localStorageOku () {
    let borclar = localStorageArrayeDonustur()

    
    borclar.forEach(function(borc){
        borcItemOlustur(borc)
    })
}

function borcItemOlustur(borc) {
    //div oluşturma
    const borcDiv = document.createElement('li')
    borcDiv.classList.add('borc-item')

    //li oluşturma
    const borcLi = document.createElement('li')
    borcLi.classList.add('borc-tanim')
    borcLi.innerText = borc
    borcDiv.appendChild(borcLi)

    //gorev tamamlandı butonu oluşturma(yeni bir buton ama html/css de daha önceden hazırladığımız buton stilini vereceğiz)
    const borcTamamBtn = document.createElement('button')
    borcTamamBtn.classList.add('borc-btn')
    borcTamamBtn.classList.add('borc-btn-odendi')
    borcTamamBtn.innerHTML = '<i class="far fa-check-square"></i>'
    borcDiv.appendChild(borcTamamBtn)

     //gorev sil butonu oluşturma(yeni bir buton ama html/css de daha önceden hazırladığımız buton stilini vereceğiz)
     const borcSilBtn = document.createElement('button')
     borcSilBtn.classList.add('borc-btn')
     borcSilBtn.classList.add('borc-btn-sil')
     borcSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
     borcDiv.appendChild(borcSilBtn)
    

    
    //oluşturduğumuz div'i ul'ye ekleme
    borcListesi.appendChild(borcDiv)

}


function localStorageSil(borc) {
    let borclar = localStorageArrayeDonustur()
   
    
    //splice ile item sil
    const silinecekElemanIndex = borclar.indexOf(borc)
    console.log(silinecekElemanIndex)
    borclar.splice(silinecekElemanIndex,1)

    localStorage.setItem('borclar', JSON.stringify(borclar))


}   