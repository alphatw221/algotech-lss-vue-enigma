<template>
    <div class="tableWrapper mt-4">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subscription ID</th>
            <th class="hidden sm:table-cell">Plan</th>
            <th class="hidden md:table-cell">End Date</th>
            <th class="hidden lg:table-cell">Status</th>
            <th class="hidden lg:table-cell">E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
          <tr>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading"><div class="bar"></div></td>
            <td class="loading hidden sm:table-cell"><div class="bar"></div></td>
            <td class="loading hidden md:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
            <td class="loading hidden lg:table-cell"><div class="bar"></div></td>
          </tr>
        </tbody>
      </table>
    </div>
    </template>
    
    <style scoped>
    @keyframes loading {
        40% {
            background-position:
                100% 0;
        }
        100% {
            background-position:
                100% 0;
        }
    }
    
    .tableWrapper {
      width: 100%;
      .table {
        margin: 0 auto;
        text-align: left;
        border-spacing: 0;
    
        thead{
            background-color: theme("colors.secondary");
        }
        tbody {
    
          td {
            padding: 20px 0;
            min-width: auto;
    
            span {
                color: #FEFEFE;
            }
    
            &:last-child {
                border-radius: 0 8px 8px 0;
            }
          }
        }
      }
      .loading {
        position: relative;
        
        .bar {
          background-color: #E7E7E7;
          height: 14px;
          border-radius: 7px;
          width: 80%;
        }
    
        &:after {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            left: 0;
            content: "";
            display: block;
            width: 100%;
            height: 24px;
            background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 80% );
            background-size: 200px 24px;
            background-position: -100px 0;
            background-repeat: no-repeat;
            animation: loading 1s infinite;
        }
      }
    }
    </style>