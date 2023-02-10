//Déclaration d'un tableau pour le stockage des zones
var lstZone=document.getElementById("ZZone")
var txtTarif=document.getElementById("ZTarif")
var lstTranche=document.getElementById("ZTranche")
var txtRed=document.getElementById("ZReduction")


function tarif()
{
    var index=lstZone.selectedIndex
    if (index==0) //"Choisir une zone" est sélectionnée
        txtTarif.value="Aucune zone choisie"
            else
        txtTarif.value=tabTarifZ[index-1]
}
function reduction()
{
    var index=lstTranche.selectedIndex
    if (index==0) //"Choisir une tranche" est sélectionnée
        txtRed.value="Aucune tranche choisie"
    else if (index==3)
        {   var zone=lstZone.selectedIndex
            if (zone==0)
                txtRed.value="Il faut choisir une zone"
            else if (zone>=1 && zone<=3)
                txtRed.value=tabReduction[index-1][0]
            else
                    txtRed.value=tabReduction[index-1][1]
        }
    else
        txtRed.value=tabReduction[index-1]
    
}

function simuler()
{
    //verifier() si la fonction n'a pas de retour sinon elle est 
    //utilisée comme une variable
    var err=verifier()
    if (err!="")
        document.getElementById("lblErreur").innerHTML=verifier()
    else
    {
    var TJ = tarifjour()

    if (document.getElementsByName("Periode")[0].checked)
    //ou if (document.getElementsById("radJ").checked)
        alert(TJ)
    else if (document.getElementsByName("Periode")[1].checked)
        alert(TJ*7-TJ*7*(10/100))
    else
        alert( TJ*30-TJ*30*(20/100))
    }
}


function verifier()
{
var err=""
if (document.getElementById("ZNom").value=="" || document.getElementById("ZPrenom").value=="" || document.getElementById("ZCIN").value=="")
    err="Nom, Prénom et CIN obligatoires"
if (document.getElementById("ZZone").value==0)
    err+= "<br/>Zone obligatoire"
if (document.getElementById("ZTranche").value==0)
    err+= "<br/>Tranche obligatoire"
if (!document.getElementById("CKMetro").checked && !document.getElementById("CKRER").checked && !document.getElementById("CKTGV").checked)
    err+= "<br/>Au moins un type doit être choisi"
return err
}

function supplement()
{ var sup=0
if (document.getElementById("CKMetro").checked)
    sup+=2
if (document.getElementById("CKRER").checked)
    sup+=4
if (document.getElementById("CKTGV").checked)
    sup=sup+8
return sup
}
function tarifjour() {
    var tarif = eval(txtTarif.value)
    var red=eval(txtRed.value)
    var PB = tarif + supplement()
    return PB-PB*red/100 // on a appliqué la réduction de la tranche d'âge
}



