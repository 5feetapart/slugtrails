<div class="wrapper">
    <h1>Weekly Stats</h1>
    <div class="weekly">
        <div class="left">
            <div class="circle">
                <h2 style="">Streak</h2>
                <h1>9</h1>
            </div>
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
    text-align:center;
    margin:var(--gap-3);

}
.weekly{
    border: var(--clr-green-500) solid var(--gap-1);
    margin-left:var(--gap-2);
    margin-right:var(--gap-2);
    display:flex;
    flex-direction:row;
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
    display:grid;
    padding:var(--gap-2);
}
.circle{
    border-radius: 100%;
    background-color: var(--clr-gray-50);
    justify-content: center;
    display:grid;
    text-align:center;
    color:var(--clr-pink-500);
    height:100%;
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