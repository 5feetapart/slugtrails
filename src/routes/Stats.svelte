<div class="wrapper">
    <h1>Weekly Stats</h1>
    <div class="weekly">
        <div class="left">
        </div>
        <div class="right">
            <!-- graph goes here -->
            <div style="width:200px; height:200px; background-color:bisque">
            <!-- placeholder div -->
            </div>
        </div>
    </div>
    <h1>Monthly Stats</h1>
    <div>
        <div class="monthly">
            <div style="width:400px; height:200px; background-color:bisque">
                <!-- placeholder div -->
                </div>
        </div>
    </div>
</div>

<style>
.wrapper{
    display:grid;
    justify-content: center;
    flex-direction: column;
    margin:var(--gap-4);
    text-align:center;

}
.weekly{
    border: var(--clr-green-500) solid var(--gap-1);
    display:flex;
    flex-direction:row;
    width:75%;
}
.left{
    background-color:var(--clr-green-500);
    width:100%;
    height:100%;
}
.right{
    background-color:var(--clr-gray-50);
    width:100%;
    height:100%;
    justify-content: center;
    display:flex;
    padding:var(--gap-2);
}

.monthly{
    justify-content: center;
    display: flex;
    width:100vw;
    background-color:var(--clr-gray-50);
    border-bottom: var(--clr-green-500) solid var(--gap-1);
    border-top: var(--clr-green-500) solid var(--gap-1);
    padding-top:var(--gap-2);
    padding-bottom:var(--gap-2);
}
</style>